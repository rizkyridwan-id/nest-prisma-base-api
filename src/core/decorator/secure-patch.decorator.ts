import { applyDecorators, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';

export function SecurePatch(path = '') {
  return applyDecorators(UseGuards(JwtAuthGuard), Patch(path));
}
