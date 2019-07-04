import * as mongoose from 'mongoose';
const mongoose_connection_string = 'mongodb://admin-123:password-123@localhost:27017/Nest?authSource=admin'
// OTHER_WAY_MONGOOSE
export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(mongoose_connection_string),
  },
];