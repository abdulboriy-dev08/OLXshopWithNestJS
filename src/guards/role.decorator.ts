import { SetMetadata } from '@nestjs/common';
import { userRole } from '../user/dto/register.dto';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: userRole[]) => SetMetadata(ROLES_KEY, roles);
