import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  buildPaginationMeta,
  PaginationQueryDto,
  parsePaginationQuery,
} from 'src/common/dto/pagination-query.dto';
import { ModelConfig } from 'src/models/modelConfig';
import { CreateModelConfigDto } from './dto/create-model-config.dto';

@Injectable()
export class ModelConfigService {
  constructor(
    @InjectModel(ModelConfig.name)
    private modelConfigModel: Model<ModelConfig>,
  ) {}

  async getAll(query: PaginationQueryDto = {}) {
    const { page, limit, skip } = parsePaginationQuery(query);

    const [items, total] = await Promise.all([
      this.modelConfigModel
        .find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('modelId', 'previewUrl')
        .lean()
        .exec(),
      this.modelConfigModel.countDocuments().exec(),
    ]);

    const data = items.map((item) => {
      const catalog = item.modelId as unknown as {
        _id: Types.ObjectId;
        previewUrl?: string;
      } | null;

      return {
        ...item,
        modelId: catalog?._id?.toString() ?? String(item.modelId),
        previewUrl: catalog?.previewUrl,
      };
    });

    return {
      data,
      meta: buildPaginationMeta(total, page, limit),
    };
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
