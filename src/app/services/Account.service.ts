import assert from 'assert';
import { Account } from 'oidc-provider';
import models from '../models';
import { UserStatic } from '../models/User';
const User: UserStatic = models.User;

class AccountService {
  // This interface is required by oidc-provider
  async findAccount(_: any, username: string): Promise<Account> {
    // This would ideally be just a check whether the account is still in your storage
    const account = await User.findOne({ where: { email: username } });
    if (!account) {
      return Promise.reject('Account not found');
    }

    return {
      accountId: account.email,
      // and this claims() method would actually query to retrieve the account claims
      async claims() {
        return {
          sub: account.email,
          email: account.email,
          phone_number: '85999515458',
          name: 'Clairton Luz',
          gender: 'Male',
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
      const account = await User.findOne({ where: { email: lowercased, password } })
      assert(account, 'invalid credentials provided');

      return account!.email;
    } catch (err) {
      return undefined;
    }
  }
}

export default new AccountService();
