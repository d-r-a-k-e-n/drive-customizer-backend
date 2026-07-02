import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  @IsString()
  @ApiProperty({ example: 'BMW M3' })
  name!: string;

  @IsString()
  @ApiProperty({ example: 'bmw-m3' })
  slug!: string;

  @IsString()
  @ApiProperty({ example: 'https://example.com/models/bmw-m3.glb' })
  modelUrl!: string;

  @IsString()
  @ApiProperty({ example: 'https://example.com/previews/bmw-m3.png' })
  previewUrl!: string;
}
