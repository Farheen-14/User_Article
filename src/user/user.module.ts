import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Article } from 'src/article/entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
