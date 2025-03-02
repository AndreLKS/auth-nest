import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        HttpModule,
    ],
    controllers: [],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
