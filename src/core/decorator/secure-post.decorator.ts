import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

export function SecurePost(path = '') {
  return applyDecorators(UseGuards(JwtAuthGuard), Post(path));
}
