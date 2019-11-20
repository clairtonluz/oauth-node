// import { Adapter, AdapterPayload } from 'oidc-provider';
// import { DataTypes, Sequelize } from 'sequelize';
// // const Sequelize = require('sequelize'); // eslint-disable-line import/no-unresolved

// const sequelize = new Sequelize('database', 'username', 'password', {
//   dialect: 'sqlite',
//   storage: 'db.sqlite',
// });

// const grantable = new Set([
//   'AccessToken',
//   'AuthorizationCode',
//   'RefreshToken',
//   'DeviceCode',
// ]);

// const models = [
//   'Session',
//   'AccessToken',
//   'AuthorizationCode',
//   'RefreshToken',
//   'DeviceCode',
//   'ClientCredentials',
//   'Client',
//   'InitialAccessToken',
//   'RegistrationAccessToken',
// ].reduce((map, name) => {
//   map.set(name, sequelize.define(name, {
//     id: { type: DataTypes.STRING, primaryKey: true },
//     grantId: { type: DataTypes.UUIDV4 },
//     userCode: { type: DataTypes.UUIDV4 },
//     data: { type: DataTypes.JSON },
//     expiresAt: { type: DataTypes.DATE },
//     consumedAt: { type: DataTypes.DATE },
//   }));

//   return map;
// }, new Map());

// class SequelizeAdapter implements Adapter {
//   model: any;
//   name: string;
//   constructor(name: string) {
//     this.model = models.get(name);
//     this.name = name;
//   }

//   async upsert(id: string, data: AdapterPayload, expiresIn: number) {
//     console.log('upsert', id, data, expiresIn);
//     await this.model.upsert({
//       id,
//       data,
//       ...(data.grantId ? { grantId: data.grantId } : undefined),
//       ...(data.userCode ? { userCode: data.userCode } : undefined),
//       ...(expiresIn ? { expiresAt: new Date(Date.now() + (expiresIn * 1000)) } : undefined),
//     });
//   }

//   async find(id: string) {
//     console.log('find', id);
//     console.log('model', this.model);
//     return this.model.findByPrimary(id).then((found: any) => {
//       if (!found) return undefined;
//       return {
//         ...found.data,
//         ...(found.consumedAt ? { consumed: true } : undefined),
//       };
//     });
//   }

//   async findByUserCode(userCode: string) {
//     console.log('findByUserCode', userCode);
//     return this.model.findOne({ where: { userCode } }).then((found: any) => {
//       if (!found) return undefined;
//       return {
//         ...found.data,
//         ...(found.consumedAt ? { consumed: true } : undefined),
//       };
//     });
//   }

//   async destroy(id: string) {
//     console.log('destroy', id);
//     if (grantable.has(this.name)) {
//       const { grantId } = await this.model.findByPrimary(id);
//       const promises: any[] = [];
//       grantable.forEach((name) => {
//         promises.push(models.get(name).destroy({ where: { grantId } }));
//       });
//       await Promise.all(promises);
//     } else {
//       await this.model.destroy({ where: { id } });
//     }
//   }

//   async consume(id: string) {
//     console.log('consume', id);
//     await this.model.update({ consumedAt: new Date() }, { where: { id } });
//   }

//   static async connect() {
//     console.log('connect');
//     return sequelize.sync();
//   }

//   async findByUid(uid: string): Promise<AdapterPayload | undefined | void> {
//     console.log('findByUid', uid);
//     return undefined;
//   }
//   async revokeByGrantId(grantId: string): Promise<undefined | void> {
//     console.log('revokeByGrantId', grantId);
//     return undefined;
//   }
// }

// export default SequelizeAdapter;
