import { Article } from 'src/article/entities/article.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @OneToMany(() => Article, (article: Article) => article.author)
  articles: Article[];
}
