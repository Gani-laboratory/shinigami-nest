import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleType } from '../modules/auth/role-types';
import { RolesGuard } from '../guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

export const Auth = (...roles: RoleType[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
  );
};
