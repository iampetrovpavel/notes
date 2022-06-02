import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from 'src/dto/user.dto';
import { ProducerServise } from 'src/kafka/producer.servise';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.usersService.findAll()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param() params) {
        return await this.usersService.findOne(params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param() params, @Body() userDto: UserDto) {
        return await this.usersService.update(params.id, userDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param() params) {
        return await this.usersService.remove(params.id)
    }
}
