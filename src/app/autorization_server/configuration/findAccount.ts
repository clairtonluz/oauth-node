import { FindAccount, Account } from "oidc-provider";

const findAccount: FindAccount = async (_: any, id: string): Promise<Account> => {
  console.log('findAccount id', id);
  // console.log('findAccount ctx', ctx);
  return {
    accountId: id,
    async claims() {
      return {
        sub: id,
        email: `${id}@bytecom.psi.br`,
        email_verified: true,
      };
    },
  }
};

export default findAccount;
