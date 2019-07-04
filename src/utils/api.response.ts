import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, catchError } from 'rxjs/operators';
import { messages } from './messages.localization';


export enum NotificationType {
    BANNER = "BANNER",
}

export interface IOutput<T> {
    data: T;
    meta: {
        date?: string
        status: number,
        developerMessage: string
    };
    notification: {
        type: string,
        message: string
    }
}

export class ApiResponse<T> {
    constructor() {
        return this;
    }
    private _data: T = undefined;
    private _status: number = 500;
    private _error: string = undefined;
    private _notification: string = undefined;
    private _notifyBy: NotificationType = NotificationType.BANNER;
    data(d) {
        this._data = d;
        return this;
    }
    status(s) {
        this._status = s;
        return this;
    }
    error(e) {
        this._error = e;
        return this;
    }
    notify(msg, type: NotificationType = NotificationType.BANNER) {
        this._notification = msg;
        this._notifyBy = type ? type : NotificationType.BANNER;
        return this;
    }
    notifyDefault(msg) {
        this._notification = msg;
        return this;
    }
    get output() {
        let outout: IOutput<T> = {
            data: this._data,
            meta: {
                date: new Date().toISOString(),
                status: this._status,
                developerMessage: this._error
            },
            ...(this._notification && {
                notification: {
                    type: this._notifyBy,
                    message: this._notification
                }
            })
        }
        return outout;
    }
}

@Injectable()
export class ApiInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request: Request = ctx.getRequest();

        return next.handle().pipe(map(output => {
            // use outout meta status which is set by developer
            const status = output.meta.status;
            response.status(status)
            return output;
        }));
    }
}



@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const request: Request = ctx.getRequest();
        return next
            .handle()
            .pipe(
                catchError(err => {
                    return throwError(new BadGatewayException())
                }),
            );
    }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        let error = status !== 400
            ? exception.message
            /** validation error format */
            : Object.keys(
                exception.message.message[0].constraints)[0]
            // + " " +
            // exception.message.message[0]
            //     .constraints[
            // Object.keys(exception.message.message[0]
            //     .constraints)[0]
            // ];

        const api = new ApiResponse<any>();
        api.status(status);
        api.error(error);
        api.notify(messages[error] ? messages[error]["fr"] : "server issue ...")
        return response
            .status(status)
            .json(api.output || "Something bad happened");
    }
}
