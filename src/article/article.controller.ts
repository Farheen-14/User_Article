import { ArticleService } from './article.service';
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Req,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { CreateArticleDTO } from './dto/create-article.dto';
import { AuthGurad } from 'src/authguard/authGuard';
import { RequestWithUser } from './interfaces/request-with-user.interface';

@Controller('api')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get('articles')
  @UseGuards(AuthGurad)
  async getAllArticles(): Promise<any> {
    //return type will be serializer if we used.
    const articles = await this.articleService.getAllArticles();

    //using this exclude the password, we can use serializer also
    const responseData = articles.map((article) => ({
      id: article.id,
      title: article.title,
      description: article.description,
      author: {
        id: article.author.id,
        email: article.author.email,
        name: article.author.name,
        age: article.author.age,
      },
    }));

    return {
      statusCode: 200,
      data: {
        data: responseData,
      },
      message: 'Articles retrieved successfully',
    };
  }

  @Post('users/:userId/articles')
  @UseGuards(AuthGurad)
  async createArticle(
    @Body(ValidationPipe) createArticleDTO: CreateArticleDTO,
    @Req() request: RequestWithUser,
  ): Promise<any> {
    try {
      const userId = request.user.id;
      const createdArticle = await this.articleService.createArticle(
        createArticleDTO,
        userId,
      );
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          data: createdArticle,
        },
        error: null,
        message: 'Article created successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        data: null,
        error: 'Failed to create article',
        message: error.message || 'An error occurred',
      };
    }
  }
}
