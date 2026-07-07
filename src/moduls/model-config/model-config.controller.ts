import { Controller } from '@nestjs/common';
import { ModelConfigService } from './model-config.service';
import { Body, Get, Param, Post } from '@nestjs/common';
import { CreateModelConfigDto } from './dto/create-model-config.dto';

@Controller('model-configs')
export class ModelConfigController {
  constructor(private readonly catalogService: ModelConfigService) {}

  @Get('')
  getAll() {
    return this.catalogService.getAll();
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
