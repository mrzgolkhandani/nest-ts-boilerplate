import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { UsersController } from './users.controllers';
import { UsersService, IsUserAlreadyExist } from './users.services';
import { DatabaseModule } from '../../configs/database/database.module';
import { usersProviders } from './users.providers';

@Module({
    // OTHER_WAY_MONGOOSE to add mongoose model
    // imports: [DatabaseModule],
    
    imports: [MongooseModule.forFeature([{name:"User",schema: UserSchema}])],
    controllers: [UsersController],
    providers: [
        // OTHER_WAY_MONGOOSE to add mongoose model
        //...usersProviders,
        IsUserAlreadyExist,UsersService],
    exports: [UsersService],
})
export class UsersModule {}
