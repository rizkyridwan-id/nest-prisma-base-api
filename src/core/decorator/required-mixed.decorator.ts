import { applyDecorators } from '@nestjs/common';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { TMixedInput } from './types/mixed-input.type';

export function IsRequiredMixed<T>(options: TMixedInput<T>) {
  return applyDecorators(
    Type(() => options.type),
    ValidateNested({ each: true }),
  );
}
