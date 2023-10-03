import { applyDecorators } from '@nestjs/common';
import { IsNumber, IsNotEmpty } from 'class-validator';

export function IsRequiredBoolean() {
  const decorators = [IsNumber(), IsNotEmpty()];

  return applyDecorators(...decorators);
}
