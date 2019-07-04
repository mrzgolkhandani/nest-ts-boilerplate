import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthenticatorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    if(req.query.token === undefined) {
      return res.status(401).end()
    }
    next();
  }
}
