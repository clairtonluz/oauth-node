import Redis from 'ioredis';
import isEmpty from 'lodash/isEmpty';
import { Adapter, AdapterPayload } from 'oidc-provider';

const client = new Redis(process.env.REDIS_URL, { keyPrefix: 'oidc:' });

const consumable = new Set([
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
]);

function grantKeyFor(id: any) {
  return `grant:${id}`;
}

function userCodeKeyFor(userCode: any) {
  return `userCode:${userCode}`;
}

function uidKeyFor(uid: any) {
  return `uid:${uid}`;
}

class RedisAdapter implements Adapter {
  name: any;
  constructor(name: any) {
    console.log('constructor', name);
    this.name = name;
  }

  async upsert(id: any, payload: AdapterPayload, expiresIn: number) {
    console.log('upsert', id, payload, expiresIn);
    const key = this.key(id);
    const store = consumable.has(this.name)
      ? { payload: JSON.stringify(payload) } : JSON.stringify(payload);

    const multi = client.multi();
    multi[consumable.has(this.name) ? 'hmset' : 'set'](key, store);

    if (expiresIn) {
      multi.expire(key, expiresIn);
    }

    if (payload.grantId) {
      const grantKey = grantKeyFor(payload.grantId);
      multi.rpush(grantKey, key);
      // if you're seeing grant key lists growing out of acceptable proportions consider using LTRIM
      // here to trim the list to an appropriate length
      const ttl = await client.ttl(grantKey);
      if (expiresIn > ttl) {
        multi.expire(grantKey, expiresIn);
      }
    }

    if (payload.userCode) {
      const userCodeKey = userCodeKeyFor(payload.userCode);
      multi.set(userCodeKey, id);
      multi.expire(userCodeKey, expiresIn);
    }

    if (payload.uid) {
      const uidKey = uidKeyFor(payload.uid);
      multi.set(uidKey, id);
      multi.expire(uidKey, expiresIn);
    }

    await multi.exec();
  }

  async find(id: any) {
    console.log('find', id, name);
    const data = consumable.has(this.name)
      ? await client.hgetall(this.key(id))
      : await client.get(this.key(id));

    if (isEmpty(data)) {
      return undefined;
    }

    if (typeof data === 'string') {
      return JSON.parse(data);
    }
    const { payload, ...rest } = data;
    return {
      ...rest,
      ...JSON.parse(payload),
    };
  }

  async findByUid(uid: any): Promise<AdapterPayload | undefined | void> {
    const id = await client.get(uidKeyFor(uid));
    return id ? this.find(id) : undefined;
  }

  async findByUserCode(userCode: any) {
    console.log('findByUserCode', userCode);
    const id = await client.get(userCodeKeyFor(userCode));
    return id ? this.find(id) : undefined;
  }

  async destroy(id: any) {
    console.log('destroy', id);
    const key = this.key(id);
    await client.del(key);
  }

  async revokeByGrantId(grantId: any): Promise<undefined | void> {
    console.log('revokeByGrantId', grantId);
    const multi = client.multi();
    const tokens: any[] = await client.lrange(grantKeyFor(grantId), 0, -1);
    tokens.forEach((token) => multi.del(token));
    multi.del(grantKeyFor(grantId));
    await multi.exec();
  }

  async consume(id: any) {
    console.log('consume', id);
    await client.hset(this.key(id), 'consumed', Math.floor(Date.now() / 1000));
  }

  key(id: any) {
    console.log('key', id);
    return `${this.name}:${id}`;
  }


}

export default RedisAdapter;
