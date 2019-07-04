import { Connection } from 'mongoose';
import { UserSchema } from './users.model';

// OTHER_WAY_MONGOOSE to add mongoose model
export const usersProviders = [
  {
    provide: 'UserModelToken',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DbConnectionToken'],
  },
];