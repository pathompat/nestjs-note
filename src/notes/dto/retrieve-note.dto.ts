import { IsOptional, IsIn } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class RetrieveNoteDto {

  @ApiPropertyOptional()
  @IsOptional()
  tag: string

  @ApiPropertyOptional()
  @IsOptional()
  @IsIn(['createdAt:asc', 'createdAt:desc','title:asc', 'title:desc'], {each: true})
  sort: string[]
}
