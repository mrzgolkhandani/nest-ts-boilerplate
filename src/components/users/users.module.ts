import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './users.model';
import { UsersController } from './users.controllers';
import { UsersService, IsUserAlreadyExist } from './users.services';
import { DatabaseModule } from '../../configs/database/database.module';
import { usersProviders } from './users.providers';
import { AuthenticatorMiddleware } from '../../utils/middlewares/authenticator.middleware';
import { logger } from '../../utils/middlewares/logger.middleware';

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
export class UsersModule implements NestModule  {
    // add middlewares 
    // first external auth 
    configure(consumer: MiddlewareConsumer) {
        consumer
        // simple version
        // .apply(logger).forRoutes("users")
        // full version
          .apply(AuthenticatorMiddleware)
          /**
           * .exclude(
                    { path: 'users', method: RequestMethod.GET },
                    { path: 'users', method: RequestMethod.POST }
                )
           */
          
          .forRoutes(UsersController);
          // or .forRoutes('users');
          // or use this => .forRoutes({ path: 'users', method: RequestMethod.ALL });
      }
}
