import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    let request: Request = context.switchToHttp().getRequest();
    let token = request.headers.authorization?.split(' ')[1];

    if (!token)
      throw new UnauthorizedException();

    try {
      let data = this.jwtService.verify(token);
      request['user'] = data;

      console.log(request['user']);

      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}