import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { TStringInput } from './types/string-input.type';

export function IsRequiredString(options: TStringInput = {}) {
  const { uppercase = false } = options;
  const decorators = [IsString(), IsNotEmpty()];

  if (uppercase)
    decorators.push(
      Transform(({ value }) =>
        typeof value === 'string' ? String(value).toUpperCase() : value,
      ),
    );

  return applyDecorators(...decorators);
}
