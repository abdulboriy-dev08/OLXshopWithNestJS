import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { totp } from 'otplib';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateRegisterDto } from './dto/update-registerdto';

@Injectable()
export class UserService {
  constructor(
    private Prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

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

      let checkPhone = await this.Prisma.user.findUnique({
        where: { phone: registerDto.phone },
      });

      if (checkPhone) throw new BadRequestException( `This ${registerDto.phone} phoneNumber already registered ❗` );

      let findRegion = await this.Prisma.regions.findFirst({
        where: { id: registerDto.regionId },
      });

      if (!findRegion) throw new NotFoundException('Region not found ❗');

      let hashPass = bcrypt.hashSync(registerDto.password, 10);
      let data = { ...registerDto, password: hashPass };

      let userRegister = await this.Prisma.user.create({ data });

      totp.options = { digits: 6, step: 1800 };
      let otp = totp.generate(`secretKey_${registerDto.email}`);

      await this.mailService.sendMail(
        registerDto.email,
        'One-time password',
        `This is an OTP to activate your account: <h1>${otp}</h1>`,
      );

      return {
        message:
          'User registerted successfully, We send an OTP to your email. Please activate your account !',
        userRegister,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async verifyOtp(email: string, otp: string) {
    try {
      let user = await this.Prisma.user.findUnique({ where: { email } });
      if (!user) throw new BadRequestException('Wrong email ❗');

      let checkOtp = totp.verify({ token: otp, secret: `secretKey_${email}` });
      if (!checkOtp) throw new BadRequestException('Wrong otp ❗');

      if (user.status == 'INACTIVE') {
        await this.Prisma.user.update({
          data: { status: 'ACTIVE' },
          where: { email },
        });
      }

      return { message: 'Your account verified successfully ✅' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async login(loginDto: LoginDto) {
    try {
      let user = await this.findUser(loginDto.email);
      if (!user) throw new BadRequestException('Wrong email ❗');

      if (user.status == 'INACTIVE')
        return { message: 'You should activate your account ❗' };

      let comparePass = bcrypt.compareSync(loginDto.password, user.password);
      if (!comparePass) throw new BadRequestException('Wrong password ❗');

      let token = this.jwtService.sign({ id: user.id, role: user.role });

      return { message: 'Logged in successfully ✅', access_token: token };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let users = await this.Prisma.user.findMany();
      if (!users) return { message: 'User table is empty' };

      return { users };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let user = await this.Prisma.user.findFirst({ where: { id: +id } });
      if (!user) throw new NotFoundException('User not found ❗');

      return { user };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(updateRegisterDto: UpdateRegisterDto, id: string) {
    try {
      let user = await this.Prisma.user.findFirst({ where: { id: +id } });
      if (!user) throw new NotFoundException('User not found ❗');

      let newUser = await this.Prisma.user.update({
        data: updateRegisterDto,
        where: { id: +id },
      });

      return { newUser };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let user = await this.Prisma.user.findFirst({ where: { id: +id } });
      if (!user) throw new NotFoundException('User not found ❗');

      await this.Prisma.user.delete({ where: { id: +id } });
      return { message: 'User is deleted successfully ✅' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
