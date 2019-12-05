import { Adapter } from "oidc-provider";

const LRU = require('lru-cache');

const epochTime = require('../helpers/epoch_time');

let storage = new LRU({});

function grantKeyFor(id: any) {
  return `grant:${id}`;
}

function sessionUidKeyFor(id: any) {
  return `sessionUid:${id}`;
}

function userCodeKeyFor(userCode: any) {
  return `userCode:${userCode}`;
}

class MemoryAdapter implements Adapter {
  private model: any;
  constructor(model: any) {
    this.model = model;
  }

  key(id: any) {
    return `${this.model}:${id}`;
  }

  async destroy(id: any) {
    const key = this.key(id);
    storage.del(key);
  }

  async consume(id: any) {
    storage.get(this.key(id)).consumed = epochTime();
  }

  async find(id: any) {
    return storage.get(this.key(id));
  }

  async findByUid(uid: any) {
    const id = storage.get(sessionUidKeyFor(uid));
    return this.find(id);
  }

  async findByUserCode(userCode: any) {
    const id = storage.get(userCodeKeyFor(userCode));
    return this.find(id);
  }

  async upsert(id: any, payload: any, expiresIn: any) {
    const key = this.key(id);

    if (this.model === 'Session') {
      storage.set(sessionUidKeyFor(payload.uid), id, expiresIn * 1000);
    }

    const { grantId, userCode } = payload;
    if (grantId) {
      const grantKey = grantKeyFor(grantId);
      const grant = storage.get(grantKey);
      if (!grant) {
        storage.set(grantKey, [key]);
      } else {
        grant.push(key);
      }
    }

    if (userCode) {
      storage.set(userCodeKeyFor(userCode), id, expiresIn * 1000);
    }

    storage.set(key, payload, expiresIn * 1000);
  }

  async revokeByGrantId(grantId: any) { // eslint-disable-line class-methods-use-this
    const grantKey = grantKeyFor(grantId);
    const grant = storage.get(grantKey);
    if (grant) {
      grant.forEach((token: any) => storage.del(token));
      storage.del(grantKey);
    }
  }
}

export const setStorage = (store: any) => { storage = store; };
export default MemoryAdapter;
