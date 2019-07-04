// users crud functions
import { Model, Connection } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, UserCreationDto } from './users.model';

// to control user inputs
import { validate } from "class-validator";
import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";


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
     // constructor(@InjectModel("UserModelToken") private readonly userModel: Model<IUser>) {}
    constructor(@InjectModel("User") private readonly userModel: Model<IUser>) {
        // put your crud functions go outside of constructor
    }
    async createUser(user: UserCreationDto): Promise<any> {
        let x = new UserCreationDto();
        x.name = user.name;
        x.username = user.username;
        return validate(x).then(async (errors) => {
            console.log(errors)
            if (errors.length > 0) {
                console.log("validation failed. errors: ", errors);
                return errors;
            } else {
                console.log("validation succeed");
                const createdUser = new this.userModel(user)
                return await createdUser.save();
            }
        })
        
    }
    async findAllUser(): Promise<IUser[]> {
        return await this.userModel.find();
    }

    async findUserByUsername(username): Promise<IUser> {
        return await this.userModel.findOne({username});
    }
}



@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
	constructor(protected readonly usersService: UsersService) {}

	async validate(text: string) {
		const user = await this.usersService.findUserByUsername(text);
		return !user;
	}
}