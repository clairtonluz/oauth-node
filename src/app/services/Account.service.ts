import assert from 'assert';
import low from 'lowdb';
import Memory from 'lowdb/adapters/Memory';
import { Account } from 'oidc-provider';

const db = low(new Memory('db'));

db.defaults({
  users: [
    {
      id: '23121d3c-84df-44ac-b458-3d63a9a05497',
      email: 'foo@example.com',
      email_verified: true,
    },
    {
      id: 'c2ac2b4a-2262-4e2f-847a-a40dd3c4dcd5',
      email: 'bar@example.com',
      email_verified: false,
    },
  ],
}).write();

class AccountService {
  // This interface is required by oidc-provider
  async findAccount(_: any, id: string): Promise<Account> {
    // This would ideally be just a check whether the account is still in your storage
    const account = db.get('users').find({ id }).value();
    if (!account) {
      return Promise.reject('Account not found');
    }

    return {
      accountId: id,
      // and this claims() method would actually query to retrieve the account claims
      async claims() {
        return {
          sub: id,
          email: account.email,
          email_verified: account.email_verified,
        };
      },
    };
  }

  // This can be anything you need to authenticate a user
  async authenticate(email: string, password: string) {
    try {
      assert(password, 'password must be provided');
      assert(email, 'email must be provided');
      const lowercased = String(email).toLowerCase();
      const account = db.get('users').find({ email: lowercased }).value();
      assert(account, 'invalid credentials provided');

      return account.id;
    } catch (err) {
      return undefined;
    }
  }
}

export default new AccountService();
