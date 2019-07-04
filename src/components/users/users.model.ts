// import * as mongoose from 'mongoose' is not neccesarry
import { Document , Schema, Model, Mongoose, Collection, connection } from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    username: String
});

// user interface which is going to use in service class
export interface IUser extends Document {
    readonly name: string;
    readonly username: string;
}

// All data transfer objects go here for easier access

// for class level validation use this
import { ValidationArguments, Validate, Length, IsAlpha, NotEquals } from 'class-validator';
import { IsUserAlreadyExist } from './users.services';
// see doc https://github.com/typestack/class-validator

export class UserCreationDto {
    @IsAlpha()
    @NotEquals("test")
    public name: string;

    @Length(10, 20,{
        message: (args: ValidationArguments) => {
            if (args.value.length === 1) {
                return "Too short, minimum length is 1 character";
            } else {
                return "Too short, minimum length is " + args.constraints[0] + " characters";
            }
        }
    })
    @Validate(IsUserAlreadyExist,{
        message:"user exists"
    })
    public username: string;
}







