import { ApiProperty } from '@nestjs/swagger';

export class CreateCatalogDto {
  @ApiProperty({ example: 'BMW M3' })
  name: string;

  @ApiProperty({ example: 'bmw-m3' })
  slug: string;

  @ApiProperty({ example: 'https://example.com/models/bmw-m3.glb' })
  modelUrl: string;

  @ApiProperty({ example: 'https://example.com/previews/bmw-m3.png' })
  previewUrl: string;
}
