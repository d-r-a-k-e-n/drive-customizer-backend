import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from '../../models/catalog';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>,
  ) {}

  async getAll() {
    const items = await this.catalogModel.find().exec();

    return { data: items };
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
