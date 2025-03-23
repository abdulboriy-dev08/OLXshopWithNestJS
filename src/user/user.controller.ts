import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService;
  }

  @Post('/verify-otp')
  verifyOtp(@Body() data: any) {
    return this.userService;
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService;
  }
}
