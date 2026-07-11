import { Controller } from '@nestjs/common';
import { ModelConfigService } from './model-config.service';
import { Body, Get, Param, Post, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { CreateModelConfigDto } from './dto/create-model-config.dto';

@Controller('model-configs')
export class ModelConfigController {
  constructor(private readonly catalogService: ModelConfigService) {}

  @Get('')
  getAll(@Query() query: PaginationQueryDto) {
    return this.catalogService.getAll(query);
  }

  @Get('model/:modelId')
  getByModelId(@Param('modelId') modelId: string) {
    return this.catalogService.getByModelId(modelId);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.catalogService.getById(id);
  }

  @Post('creates')
  create(@Body() data: CreateModelConfigDto) {
    return this.catalogService.create(data);
  }
}
