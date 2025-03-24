import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export enum userRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export class RegisterDto {
  @IsString({ message: 'Full Name must be a string ❗' })
  @ApiProperty({ example: 'Abdulboriy Mahamatjanov' })
  fullName: string;

  @IsNumber({}, { message: 'Year must be a number ❗' })
  @IsPositive({ message: 'Year must be a positive number ❗' })
  @ApiProperty({ example: '16' })
  year: number;

  @IsEmail({}, { message: 'Invalid email format ❗' })
  @ApiProperty({ example: 'abdulborimahammadjanov86@gmail.com' })
  email: string;

  @IsString({ message: 'Password must be a string ❗' })
  @ApiProperty({ example: 'admin1234' })
  password: string;

  @IsPhoneNumber('UZ', { message: 'Invalid phone number format ❗' })
  @ApiProperty({ example: '+998507525150' })
  phone: string;

  @IsString({ message: 'Role must be a string ❗' })
  @ApiProperty({
    type: String,
    enum: userRole,
    default: userRole.USER,
    example: userRole.ADMIN,
  })
  role: userRole;

  @IsString({ message: 'Avatar must be a string ❗' })
  @ApiProperty({ example: '1742753992335.webp' })
  avatar: string;

  @IsNumber({}, { message: 'Region must be a number ❗' })
  @IsPositive({ message: 'Region must be a positive number ❗' })
  @ApiProperty({ example: '1' })
  regionId: number;
}
