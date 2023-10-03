import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvService } from './modules/env.service';
import { HashService } from './modules/hash.service';
import { PrismaService } from './modules/prisma.service';
import { SignatureService } from './modules/signature.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [PrismaService, EnvService, SignatureService, HashService],
  exports: [PrismaService, EnvService, SignatureService, HashService],
})
export class HelperModule {}
