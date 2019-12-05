import Redis from 'ioredis';
import isEmpty from 'lodash/isEmpty';
import { Adapter, AdapterPayload } from 'oidc-provider';

const client = new Redis(process.env.REDIS_URL, { keyPrefix: 'oidc:' });
client.on('connect', function () {
  console.log(`Redis connected on ${process.env.REDIS_URL}`);
});

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
    this.name = name;
  }

  key(id: string) {
    return `${this.name}:${id}`;
  }

  async destroy(id: string) {
    const key = this.key(id);
    await client.del(key);
    return;
  }

  async consume(id: string) {
    await client.hset(this.key(id), 'consumed', Math.floor(Date.now() / 1000));
    return;
  }

  async find(id: string) {
    const data: any = consumable.has(this.name)
      ? await client.hgetall(this.key(id))
      : await client.get(this.key(id));

    if (isEmpty(data)) return undefined;

    if (typeof data === 'string') return JSON.parse(data);

    const { payload, ...rest } = data;

    return {
      ...rest,
      ...JSON.parse(payload),
    };
  }

  async findByUid(uid: string): Promise<AdapterPayload | undefined | void> {
    const id = await client.get(uidKeyFor(uid));
    return id ? this.find(id) : undefined;
  }

  async findByUserCode(userCode: string) {
    const id = await client.get(userCodeKeyFor(userCode));
    return id ? this.find(id) : undefined;
  }

  async upsert(id: string, payload: AdapterPayload, expiresIn: number) {
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
    const multi = client.multi();
    const tokens: string[] = await client.lrange(grantKeyFor(grantId), 0, -1);
    tokens.forEach((token) => multi.del(token));
    multi.del(grantKeyFor(grantId));
    await multi.exec();
    return;
  }
}

export default RedisAdapter;
