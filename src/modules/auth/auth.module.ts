import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/core/auth/jwt.strategy';
import { HelperModule } from 'src/core/helper/helper.module';
import { EnvService } from 'src/core/helper/modules/env.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [HelperModule],
      useFactory: (envService: EnvService) => ({
        secret: envService.variables.jwtSecretKey,
        signOptions: { expiresIn: 6000 },
      }),
      inject: [EnvService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
