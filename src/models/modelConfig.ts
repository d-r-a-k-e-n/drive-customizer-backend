import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'model_configs' })
export class ModelConfig extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Catalog', required: true })
  modelId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop()
  thumbnailUrl?: string;

  @Prop([
    {
      meshId: { type: String, required: true },
      color: { type: String, required: true },
    },
  ])
  config!: {
    meshId: string;
    color: string;
  }[];
}

export const ModelConfigSchema = SchemaFactory.createForClass(ModelConfig);
