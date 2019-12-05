import Redis from 'ioredis';
import isEmpty from 'lodash/isEmpty';
import { Adapter, AdapterPayload } from 'oidc-provider';

// console.log('REDIS_URL', process.env.REDIS_URL);
const client = new Redis(6379, 'redis', { keyPrefix: 'oidc:' });

const consumable = new Set([
  'AuthorizationCode',
  'RefreshToken',
  'DeviceCode',
]);

function grantKeyFor(id: string) {
  return `grant:${id}`;
}

function userCodeKeyFor(userCode: string) {
  return `userCode:${userCode}`;
}

function uidKeyFor(uid: string) {
  return `uid:${uid}`;
}

class RedisAdapter implements Adapter {
  public name: string;
  constructor(name: string) {
    console.log('constructor', name);
    this.name = name;
  }

  key(id: string) {
    console.log('key', id);
    return `${this.name}:${id}`;
  }

  async destroy(id: string) {
    console.log('destroy', id);
    const key = this.key(id);
    await client.del(key);
    return;
  }

  async consume(id: string) {
    console.log('consume', id);
    await client.hset(this.key(id), 'consumed', Math.floor(Date.now() / 1000));
    return;
  }

  async find(id: string) {
    console.log('find', id, this.name);
    const data = consumable.has(this.name)
      ? await client.hgetall(this.key(id))
      : await client.get(this.key(id));

    if (isEmpty(data)) return undefined;

    if (typeof data === 'string') return JSON.parse(data);
    console.log('data', data);
    // TODO:// ver isso
    // const { payload, ...rest } = data;
    const { ...rest } = data;
    return {
      ...rest,
      // ...JSON.parse(payload),
    };
  }

  async findByUid(uid: string): Promise<AdapterPayload | undefined | void> {
    console.log('findByUid', uid);
    const id = await client.get(uidKeyFor(uid));
    return id ? this.find(id) : undefined;
  }

  async findByUserCode(userCode: string) {
    console.log('findByUserCode', userCode);
    const id = await client.get(userCodeKeyFor(userCode));
    return id ? this.find(id) : undefined;
  }

  async upsert(id: string, payload: AdapterPayload, expiresIn: number) {
    console.log('upsert', id, payload, expiresIn);
    const key = this.key(id);
    const store = JSON.stringify(payload);

    const multi = client.multi();
    if (consumable.has(this.name)) {
      multi.hmset(key, 'payload', store);
    } else {
      multi.set(key, store);
    }

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
    return;
  }

  async revokeByGrantId(grantId: string): Promise<undefined | void> {
    console.log('revokeByGrantId', grantId);
    const multi = client.multi();
    const tokens: string[] = await client.lrange(grantKeyFor(grantId), 0, -1);
    tokens.forEach((token) => multi.del(token));
    multi.del(grantKeyFor(grantId));
    await multi.exec();
    return;
  }
}

export const setStorage = (store: string) => {
  console.log('setStorage', store);
};
export default RedisAdapter;
