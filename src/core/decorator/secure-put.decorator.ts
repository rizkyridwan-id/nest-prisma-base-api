import { applyDecorators, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

export function SecurePut(path = '') {
  return applyDecorators(UseGuards(JwtAuthGuard), Put(path));
}
