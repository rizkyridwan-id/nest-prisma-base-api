import { applyDecorators, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

export function SecureGet(path = '') {
  return applyDecorators(UseGuards(JwtAuthGuard), Get(path));
}
