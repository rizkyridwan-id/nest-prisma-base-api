import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { SignatureMiddleware } from 'src/core/middleware/signature.middleware';
import { resourceProviders } from './resource.provider';

@Module({
  imports: resourceProviders,
  exports: resourceProviders,
})
export class ResourceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SignatureMiddleware)
      .exclude(
        { path: 'api/v1/auth/login', method: RequestMethod.POST },
        { path: 'api/v1/auth/register', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
