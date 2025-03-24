import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, userRole } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UpdateRegisterDto } from './dto/update-registerdto';
import { UserGuard } from 'src/guards/user.guard';
import { SelfGuard } from 'src/guards/selfPolice.guard';
import { Roles } from 'src/guards/role.decorator';
import { RoleGuard } from 'src/guards/rolePolice.guard';

@ApiTags('Authorization')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Register a new Users ' })
  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.register(registerDto);
  }

  @ApiOperation({ summary: 'Verify an OTP' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@example.com' },
        otp: { type: 'string', example: '123456' },
      },
    },
  })
  @Post('/verify-otp')
  verifyOtp(@Body() body: { email: string; otp: string }) {
    return this.userService.verifyOtp(body.email, body.otp);
  }

  @ApiOperation({ summary: 'Login Users' })
  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @ApiOperation({ summary: 'Get all Users' })
  @Roles(userRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get one User By ID' })
  @Roles(userRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(UserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Users By ID' })
  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Patch(':id')
  update(
    @Body() updateRegisterDto: UpdateRegisterDto,
    @Param('id') id: string,
  ) {
    return this.userService.update(updateRegisterDto, id);
  }

  @ApiOperation({ summary: 'Delete Users By ID' })
  @UseGuards(SelfGuard)
  @UseGuards(UserGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
