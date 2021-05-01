import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema({
    timestamps: true
})
export class Note {

  @Prop({
      required: true,
      type: String
  })
  title: string;

  @Prop({
    required: true,
    type: String
  })
  content: number;

  @Prop()
  createdAt: Date;

  @Prop([String])
  tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);