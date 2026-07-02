import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ModelConfig } from 'src/models/modelConfig';
import { CreateModelConfigDto } from './dto/create-model-config.dto';

@Injectable()
export class ModelConfigService {
  constructor(
    @InjectModel(ModelConfig.name)
    private modelConfigModel: Model<ModelConfig>,
  ) {}

  async getAll() {
    const items = await this.modelConfigModel.find().exec();
    return { data: items };
  }

  async create(data: CreateModelConfigDto) {
    return await this.modelConfigModel.create(data);
  }
}
