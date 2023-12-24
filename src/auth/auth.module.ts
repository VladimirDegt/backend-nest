import { Module } from '@nestjs/common';
import { forwardRef } from '@nestjs/common/utils';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TokenModule } from "../token/token.module";
import { tokenTimeConfig } from "./config/token-timeConfig";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TokenModule,
    forwardRef(() => UsersModule),
    JwtModule.register({
    //   global: true,
        secret: process.env.JWT_ACCESS_TOKEN,
    //   signOptions: {
    //     expiresIn: '10m',
    //   },
    }),
  ],
    exports: [
        AuthService,
        JwtModule
    ],
})
export class AuthModule {}