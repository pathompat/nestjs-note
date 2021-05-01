import { IsOptional, IsNotEmpty, IsDefined, IsDateString, IsArray } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateNoteDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  content: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  createdAt: Date

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  tags: string[]
}
