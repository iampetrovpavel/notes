import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from 'src/kafka/kafka.module';
// import { TestConsumer } from 'src/kafka/user-created.consumer';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Note } from './models/notes.model';
import { Dialect } from 'sequelize/types';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    KafkaModule, 
    ConfigModule.forRoot({ isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      models: [ Note ],
      autoLoadModels: true,
      synchronize: true,
    }),
    NotesModule,
    AuthModule
  ],
  controllers: [ ],
  providers: [ ],
  exports: [ ]
})
export class AppModule {}
