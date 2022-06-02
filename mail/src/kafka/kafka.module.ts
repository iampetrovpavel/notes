import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerServise } from './producer.servise';
import { UserCreatedConsumer } from './user-created.consumer';

@Module({
    imports: [ ],
    providers: [ ProducerServise, ConsumerService, UserCreatedConsumer ],
    exports: [ ProducerServise, ConsumerService ],
})
export class KafkaModule {}