import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Catalog extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  slug!: string;

  @Prop({ required: true })
  modelUrl!: string;

  @Prop({ required: true })
  previewUrl!: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
