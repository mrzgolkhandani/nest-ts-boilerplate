import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { IUser , UserCreationDto } from "./users.model";
import { UsersService } from './users.services';
import { ForbiddenException } from '../../utils/exceptions.handlers';
import { ApiResponse } from '../../utils/api.response';

// global version is used instead 
// @UseFilters(new HttpExceptionFilter())
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
    // global version is used instead 
    // @UseFilters(new HttpExceptionFilter())
    @Post()
    async createUser(@Body() user: UserCreationDto): Promise<any> {
        const api = new ApiResponse<any>();
        api.data(await this.usersService.createUser(user));
        api.status(201);
        return api.output;

    }

    @Get()
    async getAllUsers(): Promise<IUser[]> {
        return await this.usersService.findAllUser();
    }

    @Get('exception')
    async testException(): Promise<IUser[]> {
        // throw new HttpException({
        //     status: HttpStatus.FORBIDDEN,
        //     error: 'This is a custom message',
        //   }, 403);
        // or u can use below code => it should be approached
        throw new ForbiddenException();
    }
}
