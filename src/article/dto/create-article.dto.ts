import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
