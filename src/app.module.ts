import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelperModule } from './core/helper/helper.module';
import { ResourceModule } from './modules/resource.module';

@Module({
  imports: [ConfigModule.forRoot(), ResourceModule, HelperModule],
})
export class AppModule {}
