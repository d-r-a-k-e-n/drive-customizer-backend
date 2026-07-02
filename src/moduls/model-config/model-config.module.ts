import { Module } from '@nestjs/common';
import { ModelConfigController } from './model-config.controller';
import { ModelConfigService } from './model-config.service';
import { ModelConfig, ModelConfigSchema } from '../../models/modelConfig';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelConfig.name, schema: ModelConfigSchema },
    ]),
  ],
  providers: [ModelConfigService],
  controllers: [ModelConfigController],
})
export class ModelConfigModule {}
