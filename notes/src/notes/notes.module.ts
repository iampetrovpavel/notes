import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from 'src/models/notes.model';
import { User } from 'src/models/user.model';
import { NotesController } from './notes.controller.ts';
import { NotesService } from './notes.service';

@Module({
    imports: [SequelizeModule.forFeature([ Note ])],
    providers: [NotesService],
    controllers: [NotesController],
})
export class NotesModule {}
