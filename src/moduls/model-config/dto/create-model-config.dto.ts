import { IsString, IsArray, IsOptional } from 'class-validator';

class ConfigItem {
  @IsString()
  meshId!: string;

  @IsString()
  color!: string;
}

export class CreateModelConfigDto {
  @IsString()
  modelId!: string;

  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsString()
  backgroundColor!: string;

  @IsArray()
  config!: ConfigItem[];
}
