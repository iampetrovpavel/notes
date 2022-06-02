import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UsersService } from 'src/users/users.service';
import { ConsumerService } from './consumer.service';
import { ProducerServise } from './producer.servise';
import { UserCreatedConsumer } from './user-created.consumer';

@Module({
    imports: [ SequelizeModule.forFeature([ User ]) ],
    providers: [ ProducerServise, ConsumerService, UserCreatedConsumer, UsersService ],
    exports: [ ProducerServise, ConsumerService ],
})
export class KafkaModule {}