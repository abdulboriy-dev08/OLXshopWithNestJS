import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private Prisma: PrismaService) {}

  async findUser(email: string) {
    try {
      return await this.Prisma.user.findUnique({ where: { email } });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      let user = await this.findUser(registerDto.email);
      if (user) throw new BadRequestException('This account already exists ❗');

      let hashPass = bcrypt.hashSync(registerDto.password, 10);
      let data = { ...registerDto, password: hashPass };

      let userRegister = await this.Prisma.user.create({ data });
      return { userRegister };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
