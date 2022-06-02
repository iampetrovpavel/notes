import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';

@Module({
  imports: [
      PassportModule,
      UsersModule,
      JwtModule.register({
        secret: process.env.JWTKEY,
        signOptions: { expiresIn: process.env.TOKEN_EXPIRATION },
      }),
      SequelizeModule.forFeature([ User ])
  ],
  providers: [
    UsersService,
    JwtStrategy
  ],
  controllers: [ ]
})
export class AuthModule {}
