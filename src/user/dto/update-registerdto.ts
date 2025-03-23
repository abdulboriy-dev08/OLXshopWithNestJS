import { ApiProperty, PartialType } from '@nestjs/swagger';
import { RegisterDto } from './register.dto';
import { userRole } from './register.dto';

export class UpdateRegisterDto extends PartialType(RegisterDto) {
  @ApiProperty({ example: 'Ali Valiev' })
  fullName: string;

  @ApiProperty({ example: '20' })
  year: number;

  @ApiProperty({ example: 'valiev04@gmail.com' })
  email: string;

  @ApiProperty({ example: '12345' })
  password: string;

  @ApiProperty({ example: '+998931416717' })
  phone: string;

  @ApiProperty({
    type: String,
    enum: userRole,
    default: userRole.USER,
    example: userRole.SUPER_ADMIN,
  })
  role: userRole;

  @ApiProperty({ example: '1742753992335.webp' })
  avatar: string;

  @ApiProperty({ example: '3' })
  regionId: number;
}
