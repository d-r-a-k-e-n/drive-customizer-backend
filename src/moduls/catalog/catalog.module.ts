import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';
import { Catalog, CatalogSchema } from '../../models/catalog';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Catalog.name, schema: CatalogSchema }]),
  ],
  providers: [CatalogService],
  controllers: [CatalogController],
})
export class CatalogModule {}
