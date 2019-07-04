import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
// OTHER_WAY_MONGOOSE
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}