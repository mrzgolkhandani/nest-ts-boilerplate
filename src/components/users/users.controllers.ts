import { Controller, Get, Post, Body } from '@nestjs/common';
import { IUser , UserCreationDto } from "./users.model";
import { UsersService } from './users.services';


@Controller('users')
export class UsersController {
    /**
     * the way of dependency injection for controller and service 
     * you should add service as a provider in module
     * ```
        imports: [MongooseModule.forFeature([{name:"User",schema: UserSchema}])],
        controllers: [UsersController],
        providers: [UserService]
     * ```
     * @param usersService 
     */
    constructor(private readonly usersService: UsersService) {
        // all contorllers go outside of constructor
    }
    
    @Post()
    async createUser(@Body() user: UserCreationDto): Promise<any> {
        return await this.usersService.createUser(user);
    }

    @Get()
    async getAllUsers(): Promise<IUser[]> {
        return await this.usersService.findAllUser();
    }
}
