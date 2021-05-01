import { IsOptional, IsIn } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class RetrieveNoteDto {

  @ApiPropertyOptional({
    type: [String],
    description: `Sort column`,
    default: ['createdAt:asc']
  })
  @IsOptional()
  @IsIn(['createdAt:asc', 'createdAt:desc','title:asc', 'title:desc'], {each: true})
  sort: string[]
}
