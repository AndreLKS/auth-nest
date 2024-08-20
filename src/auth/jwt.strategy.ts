import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            passReqToCallback: true,
            secretOrKey: 'wearetechnomakers',
            algorithms: ['HS256'],
        })
    }


    async validate(request: Request, payload: any) {

        const user = await this.authService.validateToken(request, payload);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;

    }
}