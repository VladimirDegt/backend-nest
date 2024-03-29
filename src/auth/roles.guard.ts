import {
  CanActivate,
  ExecutionContext, HttpStatus,
  UnauthorizedException
} from "@nestjs/common";
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common/decorators';
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./roles-auth.decorator";
import { HttpException } from "@nestjs/common/exceptions";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
      private jwtService: JwtService,
      private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
          context.getHandler(),
          context.getClass()
      ])
      if(!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest()
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          message: 'Користувач не авторизован',
        });
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (e) {
      throw new HttpException('Не має доступу', HttpStatus.FORBIDDEN);
    }
  }
}
