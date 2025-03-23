import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'abdulborimahammadjanov86@gmail.com' })
  email: string;

  @ApiProperty({ example: 'admin1234' })
  password: string;
}
