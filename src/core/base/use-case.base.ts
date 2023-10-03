import { Injectable } from '@nestjs/common';
import { CustomLogger } from 'src/core/logger/logger';

interface JwtDecoded {
  user_id?: string;
}

export interface IUseCasePayload<T> {
  id?: number;
  data: T;
  user?: JwtDecoded;
}

@Injectable()
export class BaseUseCase {
  protected logger: CustomLogger;

  constructor() {
    this.logger = new CustomLogger(this.constructor.name);
  }
}
