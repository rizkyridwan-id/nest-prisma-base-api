import { Logger, NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { resolve } from 'path';
import { AppModule } from './app.module';
import * as fs from 'graceful-fs';
import { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import helmet from 'helmet';
import { CustomLogger } from './core/logger/logger';

async function bootstrap() {
  const securityOption: NestApplicationOptions = generateSecureOption();

  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: new CustomLogger(),
    ...securityOption,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api/v1');
  app.use(helmet());

  const port = process.env.PORT;
  const host = '0.0.0.0';
  const logger = new Logger('NestBoilerplate');

  await app.listen(port, host, () =>
    logger.log(
      `Application started at port: ${port}, isSecure: ${!!Number(
        process.env.IS_SECURE,
      )}`,
    ),
  );
}

function generateSecureOption(): NestApplicationOptions {
  const secure = !!Number(process.env.SECURE);
  if (secure) {
    /**
     * Enter Your Https Certificate using below code
     *
     * @hint make sure you set 'SECURE' field in env file to 1
     * @tips recommended for absolute root path (/)
     * @optional __dirname + path/to/file
     */

    const privateKey = fs.readFileSync(
      resolve('/path/to/private.pem'),
      'utf-8',
    );
    const certificate = fs.readFileSync(
      resolve('/path/to/certificate.pem'),
      'utf-8',
    );

    const credentials: HttpsOptions = {
      key: privateKey,
      cert: certificate,
      passphrase: '??',
    };
    return { httpsOptions: credentials };
  }
  return {};
}
bootstrap();
