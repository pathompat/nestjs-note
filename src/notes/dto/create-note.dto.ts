import { IsOptional, IsNotEmpty, IsDefined, IsArray } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateNoteDto {
  @ApiProperty({
    type: String,
    description: `Note's title/topic`
  })
  @IsDefined()
  @IsNotEmpty()
  title: string

  @ApiProperty({
    type: String,
    description: `Note's inner content`
  })
  @IsDefined()
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
