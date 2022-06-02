import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerServise } from './producer.servise';
import { TestConsumer } from './test.consumer';

@Module({
    imports: [ ],
    providers: [ ProducerServise, ConsumerService ],
    exports: [ ProducerServise, ConsumerService ],
})
export class KafkaModule {}