import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  buildPaginationMeta,
  PaginationQueryDto,
  parsePaginationQuery,
} from 'src/common/dto/pagination-query.dto';
import { Catalog } from 'src/models/catalog';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>,
  ) {}

  async getAll(query: PaginationQueryDto = {}) {
    const { page, limit, skip } = parsePaginationQuery(query);

    const [items, total] = await Promise.all([
      this.catalogModel.find().skip(skip).limit(limit).exec(),
      this.catalogModel.countDocuments().exec(),
    ]);

    return {
      data: items,
      meta: buildPaginationMeta(total, page, limit),
    };
  }

  async getById(id: string) {
    const item = await this.catalogModel.findById(id).exec();

    if (!item) {
      throw new NotFoundException(`Catalog item with id ${id} not found`);
    }

    return { data: item };
  }

  async getBySlug(slug: string) {
    const item = await this.catalogModel.findOne({ slug }).exec();

    if (!item) {
      throw new NotFoundException(`Catalog item with slug ${slug} not found`);
    }

    return item;
  }

  async create(data: CreateCatalogDto) {
    return await this.catalogModel.create(data);
  }

  async update(id: string, data: UpdateCatalogDto) {
    const item = await this.catalogModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!item) {
      throw new NotFoundException(`Catalog item with id ${id} not found`);
    }

    return item;
  }

  async remove(id: string) {
    const item = await this.catalogModel.findByIdAndDelete(id).exec();

    if (!item) {
      throw new NotFoundException(`Catalog item with id ${id} not found`);
    }

    return { success: true };
  }
}
