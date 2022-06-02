import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './kafka/kafka.module';

@Module({
  imports: [
    KafkaModule, 
    ConfigModule.forRoot({ isGlobal: true}),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
