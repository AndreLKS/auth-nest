import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AppKeyService } from './appkey/appkey.service';

const APPKEY = 'x-app-key'

@Injectable()
export class AppKeyMiddleware implements NestMiddleware {

    constructor(private readonly appKeyService : AppKeyService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const appKeyHeader = req.headers[APPKEY] as string;
        req.appKey = appKeyHeader?.toString() || null;

        if(!appKeyHeader){
            throw new UnauthorizedException('App-Key Not Informed!');
        }

        const appKey = await this.appKeyService.findByKey(appKeyHeader);

        if(!appKey){
            throw new UnauthorizedException('Invalid App-Key');
        }

        next();
    }
}
