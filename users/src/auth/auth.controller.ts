import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'src/dto/user.dto';
import { ProducerServise } from 'src/kafka/producer.servise';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private producerService: ProducerServise

    ) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @Post('signup')
    async signUp(@Body() user: UserDto) {
        const createdUser = await this.authService.create(user);
        this.producerService.produce({topic: 'user.created', messages:[{value: JSON.stringify(createdUser.user)}]})
        return createdUser
    }
}
