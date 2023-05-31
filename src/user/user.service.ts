import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from './entities/user.entity';
import { SignupUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDTO: SignupUserDto): Promise<User> {
    const { email, password, name, age } = userDTO;
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new NotAcceptableException('Email already exists');
    }
    const hashedPassword = await argon2.hash(password);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      age,
    });

    return this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async updateUserProfile(
    userId: number,
    updateUserProfileDTO: UpdateUserDto,
  ): Promise<User> {
    const { name, age } = updateUserProfileDTO;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    user.name = name;
    user.age = age;
    return this.userRepository.save(user);
  }

  async signin({ email, password }: LoginUserDto) {
    const getUser = await this.userRepository.findOne({
      where: { email: email },
    });
    if (!getUser)
      throw new BadRequestException('Either the email or password is invalid');
    const verifyPass = await argon2.verify(getUser.password, password);

    if (!verifyPass)
      throw new BadRequestException(
        'Either the username or password is invalid',
      );
    const token = sign({ email: email }, 'secret', { expiresIn: '1d' });
    return { token: token };
  }

}
