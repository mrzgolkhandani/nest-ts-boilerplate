// users crud functions
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, UserCreationDto } from './users.model';



@Injectable()
export class UsersService {
    /**
     * @InjectModel("User")
     * use user.module.ts > imports 
     * > MongooseModule.forFeature([{name:"User",schema: UserSchema}])
     * 
     * ```
        @Module({
            imports: [MongooseModule.forFeature([{name:"User",schema: UserSchema}])]
        })
     * ```
     * @param userModel 
     */

     // OTHER_WAY_MONGOOSE to add mongoose model
     // constructor(@Inject("UserModelToken") private readonly userModel: Model<IUser>) {}
    constructor(@InjectModel("User") private readonly userModel: Model<IUser>) {
        // put your crud functions go outside of constructor
    }
    async createUser(user: UserCreationDto): Promise<any> {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
        
    }
    async findAllUser(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    async findUserByUsername(username): Promise<IUser> {
        return await this.userModel.findOne({username});
    }
}

