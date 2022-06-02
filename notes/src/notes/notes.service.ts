import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteDto } from '../dto/note.dto';
import { Note } from '../models/notes.model';

@Injectable()
export class NotesService {
    constructor(@InjectModel(Note) private noteModel: typeof Note){}

    async findAll(): Promise<Note[]> {
    return await this.noteModel.findAll();
    }

    async findOne(id: string): Promise<Note> {
    return await this.noteModel.findOne({where: { id }});
    }

    async create(note: NoteDto): Promise<Note> {
    return await this.noteModel.create<Note>({...note});
    }

    async update(id: string, note: NoteDto): Promise<any> {
        const [numberOfAffectedRows, [updatedPost]] = await this.noteModel.update({ ...note }, { where: { id }, returning: true });
        return { numberOfAffectedRows, updatedPost };
    }

    async remove(id: string): Promise<void> {
    const note = await this.findOne(id);
    await note.destroy();
    }
}
