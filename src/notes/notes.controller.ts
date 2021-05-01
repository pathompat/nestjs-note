import { Controller, Get, Post, Body, Patch, Query, Param, Delete, BadRequestException } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { RetrieveNoteDto } from './dto/retrieve-note.dto';

@Controller('notes')
export class NotesController {

  private createSortOption = (sortOption): string[][] => sortOption.map((str) => {
    const split = str.split(":")
    return [split[0], split[1] === 'desc' ? -1 : 1]
  })
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  async findAll(@Query() retrieveNoteDto: RetrieveNoteDto) {
    const sort = retrieveNoteDto.sort
    const formatSort = sort ? await (Promise.all(this.createSortOption(sort))) : []
    return this.notesService.findAll(formatSort);
  }

  @Get('/tags/:tag')
  async findByTag(@Param('tag') tag: string) {
    return this.notesService.findByTag(tag);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const note = this.notesService.findOne(id);
    console.log(note)
    if(!note) throw new BadRequestException(`Invalid Id`)
    return this.notesService.remove(id)
  }
}
