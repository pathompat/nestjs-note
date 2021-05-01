import { Controller, Get, Post, Body, Patch, Query, Param, Delete, BadRequestException, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiNoContentResponse } from '@nestjs/swagger'
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RetrieveNoteDto } from './dto/retrieve-note.dto';
import { Note } from './schemas/note.schema';

@ApiTags('notes')
@Controller('notes')
export class NotesController {

  private createSortOption = (sortOption): string[][] => sortOption.map((str) => {
    const split = str.split(":")
    return [split[0], split[1] === 'desc' ? -1 : 1]
  })
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiCreatedResponse({ description: 'The record has been successfully created.', type: Note })
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOkResponse({ type: [Note] })
  async findAll(@Query() retrieveNoteDto: RetrieveNoteDto) {
    const sort = retrieveNoteDto.sort
    const formatSort = sort ? await (Promise.all(this.createSortOption(sort))) : []
    return this.notesService.findAll(formatSort);
  }

  @Get('/tags/:tag')
  @ApiOkResponse({ type: [Note] })
  async findByTag(@Param('tag') tag: string) {
    return await this.notesService.findByTag(tag);
  }

  @Get(':id')
  @ApiOkResponse({ type: Note })
  async findOne(@Param('id') id: string) {
    return await this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Note })
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    const note = await this.notesService.update(id, updateNoteDto);
    if(!note) throw new BadRequestException('Not found');
    return note;
  }

  @Delete(':id')
  @ApiBadRequestResponse({ description: 'Bad request.' })
  @ApiNoContentResponse({ description: 'The record has been successfully deleted.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const note = await this.notesService.remove(id);
    if(!note) throw new BadRequestException('Not found')
    return;
  }
}
