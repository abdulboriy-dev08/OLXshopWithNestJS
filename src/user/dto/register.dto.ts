import { ApiProperty } from '@nestjs/swagger';

enum userRole {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  USER = 'USER',
}

export class RegisterDto {
  @ApiProperty({ example: 'Abdulboriy Mahamatjanov' })
  fullName: string;

  @ApiProperty({ example: '16' })
  year: number;

  @ApiProperty({ example: 'abdulborimahammadjanov86@gmail.com' })
  email: string;

  @ApiProperty({ example: 'admin1234' })
  password: string;

  @ApiProperty({ example: '+998507525150' })
  phone: string;

  @ApiProperty({
    type: String,
    enum: userRole,
    default: userRole.USER,
    example: userRole.ADMIN,
  })
  role: userRole.USER;

  @ApiProperty({example: ''})
  avatar: string;

  @ApiProperty({ example: '1' })
  regionId: number;
}
