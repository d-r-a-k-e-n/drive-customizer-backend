import { Controller } from '@nestjs/common';
import { ModelConfigService } from './model-config.service';
import { Body, Get, Post } from '@nestjs/common';
import { CreateModelConfigDto } from './dto/create-model-config.dto';

@Controller('model-configs')
export class ModelConfigController {
  constructor(private readonly catalogService: ModelConfigService) {}

  @Get('')
  getAll() {
    return this.catalogService.getAll();
  }

  @Post('creates')
  create(@Body() data: CreateModelConfigDto) {
    return this.catalogService.create(data);
  }
}
