import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.services";

// to control user inputs

@ValidatorConstraint({ name: 'isUserAlreadyExist', async: true })
@Injectable()
export class IsUserAlreadyExist implements ValidatorConstraintInterface {
	constructor(protected readonly usersService: UsersService) {}

	async validate(text: string) {
		const user = await this.usersService.findUserByUsername(text);
		return !user;
	}
}