import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDTO } from './dto/create-article.dto';
import { User } from 'src/user/entities/user.entity';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  //   async createArticle(
  //     createArticleDTO: CreateArticleDTO,
  //     userId: number,
  //   ): Promise<Article> {
  //     const { title, description } = createArticleDTO;

  //     const article = this.articleRepository.create({
  //       title,
  //       description,
  //     });

  //     const author = await this.userRepository.findOne({
  //       where: { userId: userId },
  //     });
  //     article.author = author;

  //     return this.articleRepository.save(article);
  //   }

  async createArticle(
    createArticleDTO: CreateArticleDTO,
    userId: number,
  ): Promise<Article> {
    const { title, description } = createArticleDTO;

    const article = this.articleRepository.create({
      title,
      description,
    });

    const author = await this.userRepository.findOne({ where: { id: userId } });
    article.author = author;

    return this.articleRepository.save(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['author'] });
  }
}
