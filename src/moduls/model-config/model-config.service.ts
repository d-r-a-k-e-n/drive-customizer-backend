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

  async getByModelId(modelId: string) {
    const item = await this.modelConfigModel.findOne({ modelId }).exec();
    return { data: item };
  }

  async getById(id: string) {
    const item = await this.modelConfigModel.findById(id).exec();
    return { data: item };
  }

  async create(data: CreateModelConfigDto) {
    const item = await this.modelConfigModel.create(data);
    return { data: item };
  }
}
