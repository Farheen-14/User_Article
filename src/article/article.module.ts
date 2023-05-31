import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Article } from './entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article])],

  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
