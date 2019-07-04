import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor() {
        // super('Forbidden', HttpStatus.FORBIDDEN);
        super({
            status: HttpStatus.FORBIDDEN,
            error: 'This is a custom message',
        }, HttpStatus.FORBIDDEN)
    }
}