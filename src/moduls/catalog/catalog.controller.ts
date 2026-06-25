import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@ApiTags('catalogs')
@Controller('catalogs')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all catalog items' })
  @ApiOkResponse({ description: 'List of catalog items' })
  getAll() {
    return this.catalogService.getAll();
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a catalog item by slug' })
  @ApiParam({ name: 'slug', description: 'Catalog item slug' })
  @ApiOkResponse({ description: 'Catalog item found' })
  @ApiNotFoundResponse({ description: 'Catalog item not found' })
  getBySlug(@Param('slug') slug: string) {
    return this.catalogService.getBySlug(slug);
  }

  @Post('creates')
  @ApiOperation({ summary: 'Create a catalog item' })
  @ApiCreatedResponse({ description: 'Catalog item created' })
  create(@Body() data: CreateCatalogDto) {
    return this.catalogService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a catalog item' })
  @ApiParam({ name: 'id', description: 'Catalog item ID' })
  @ApiOkResponse({ description: 'Catalog item updated' })
  @ApiNotFoundResponse({ description: 'Catalog item not found' })
  update(@Param('id') id: string, @Body() data: UpdateCatalogDto) {
    return this.catalogService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a catalog item' })
  @ApiParam({ name: 'id', description: 'Catalog item ID' })
  @ApiOkResponse({ description: 'Catalog item deleted' })
  @ApiNotFoundResponse({ description: 'Catalog item not found' })
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id);
  }
}
