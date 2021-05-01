import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export type NoteDocument = Note & Document;

@Schema({
    timestamps: true
})
export class Note {

  @Prop({
      required: true,
      type: String
  })
  @ApiProperty({ type: String })
  title: string;

  @Prop({
    required: true,
    type: String
  })
  @ApiProperty({ type: String })
  content: string;

  @Prop()
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Prop([String])
  @ApiProperty({ type: [String] })
  tags: string[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);