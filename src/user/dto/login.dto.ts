import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format ❗' })
  @ApiProperty({ example: 'abdulborimahammadjanov86@gmail.com' })
  email: string;

  @IsString({ message: 'Password must be a string ❗' })
  @ApiProperty({ example: 'admin1234' })
  password: string;
}