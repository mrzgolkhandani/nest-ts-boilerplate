import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './components/app/app.controller';
import { AppService } from './components/app/app.service';
import { UsersModule } from './components/users/users.module';
import { constants } from "./constants"

@Module({
  imports: [
    // SIMPLE_WAY to add mongoose model
    MongooseModule.forRoot(
      constants.mongoose_connection_string,
      constants.mongoose_options),
    UsersModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { };
