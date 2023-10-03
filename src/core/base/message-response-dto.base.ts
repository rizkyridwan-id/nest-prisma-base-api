import { IsString } from 'class-validator';

export class MessageResponseDTO {
  constructor(message: string) {
    this.message = message;
  }

  @IsString()
  message: string;
}
