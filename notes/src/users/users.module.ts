import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { UsersService } from './users.service';

@Module({
  imports: [ SequelizeModule.forFeature([ User ]) ],
  providers: [ UsersService ],
  controllers: [ ],
})
export class UsersModule {}
