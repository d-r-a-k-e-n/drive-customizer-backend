import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CatalogModule } from './moduls/catalog/catalog.module';
import { ModelConfigModule } from './moduls/model-config/model-config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
    CatalogModule,
    ModelConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
