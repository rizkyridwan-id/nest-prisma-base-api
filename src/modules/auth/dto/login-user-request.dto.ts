import { IsRequiredString } from 'src/core/decorator/required-string.decorator';

export class LoginRequestDto {
  @IsRequiredString()
  user_id: string;

  @IsRequiredString()
  password: string;
}
