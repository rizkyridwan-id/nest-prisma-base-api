import { applyDecorators, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

export function SecureDelete(path = '') {
  return applyDecorators(UseGuards(JwtAuthGuard), Delete(path));
}
