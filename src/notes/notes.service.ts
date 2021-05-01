import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  create(createNoteDto: CreateNoteDto): Promise<NoteDocument> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  findAll(sort: (string | number)[][]): Promise<NoteDocument[]> {
    return this.noteModel.find().sort(sort).exec();
  }

  findByTag(tag: string): Promise<NoteDocument[]> {
    return this.noteModel.find({ tags: tag }).exec();
  }

  findOne(id: string) {
    return this.noteModel.findById(id).exec();
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto)
      .catch(err => {
        console.log(err)
      });
  }

  remove(id: string) {
    return this.noteModel.findByIdAndRemove(id).catch(err => {
      console.log(err)
    });
  }
}
