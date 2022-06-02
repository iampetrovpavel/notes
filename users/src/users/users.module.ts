import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProducerServise } from 'src/kafka/producer.servise';
import { User } from 'src/models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ SequelizeModule.forFeature([ User ]) ],
  providers: [ UsersService, ProducerServise ],
  controllers: [ UsersController ],
})
export class UsersModule {}
