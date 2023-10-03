import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IEnv {
  mode: string;
  isSecure: boolean;
  jwtSecretKey: string;
  apiKey: string;
  secretKey: string;
}
@Injectable()
export class EnvService {
  private readonly _jwtSecretKey: string;
  private readonly _mode: string;
  private readonly _isSecure: boolean;
  private readonly _apiKey: string;
  private readonly _secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this._mode = this.configService.get<string>('MODE');
    this._isSecure = Boolean(this.configService.get<number>('IS_SECURE'));
    this._jwtSecretKey = this.configService.get<string>('JWT_SECRET_KEY');
    this._apiKey = this.configService.get<string>('API_KEY');
    this._secretKey = this.configService.get<string>('SECRET_KEY');
  }

  get variables(): IEnv {
    return {
      jwtSecretKey: this._jwtSecretKey,
      apiKey: this._apiKey,
      secretKey: this._secretKey,
      mode: this._mode,
      isSecure: this._isSecure,
    };
  }
}
