import { PartialType } from '@nestjs/mapped-types';
import { CreateNoteDto } from './create-note.dto';
import { IsOptional, IsNotEmpty, IsDefined, IsArray } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
  @ApiPropertyOptional({
    type: String,
    description: `Note's title/topic`
  })
  @IsOptional()
  @IsNotEmpty()
  title: string
    
  @ApiPropertyOptional({
    type: String,
    description: `Note's inner content`
  })
  @IsOptional()
  @IsNotEmpty()
  content: string
    
  @ApiPropertyOptional({
    type: [String],
    description: `Related tags`
  })
  @IsOptional()
  @IsArray()
  tags: string[]
}
