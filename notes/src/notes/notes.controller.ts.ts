import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ProducerServise } from 'src/kafka/producer.servise';
import { NoteDto } from '../dto/note.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(
        private readonly notesService: NotesService,
    ) {}

    @Post()
    async create(@Body() noteDto: NoteDto) {
        const note = await this.notesService.create(noteDto)
        return note
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.notesService.findAll()
    }

    @Get(':id')
    async findOne(@Param() params) {
        return await this.notesService.findOne(params.id)
    }

    @Put(':id')
    async update(@Param() params, @Body() noteDto: NoteDto) {
        return await this.notesService.update(params.id, noteDto)
    }

    @Delete(':id')
    async remove(@Param() params) {
        return await this.notesService.remove(params.id)
    }
}
