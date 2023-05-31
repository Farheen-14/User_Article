import {
  Controller,
  Post,
  Body,
  HttpStatus,
  ValidationPipe,
  ConflictException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignupUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGurad } from 'src/authguard/authGuard';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body(ValidationPipe) userDTO: SignupUserDto) {
    try {
      const createdUser = await this.userService.createUser(userDTO);
      const { id, name, email, age, articles } = createdUser;
      const newUser = { id, name, email, age, articles };
      return {
        statusCode: HttpStatus.CREATED,
        data: {
          data: newUser,
        },
        error: null,
        message: 'User created successfully',
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  @Post('login')
  async login(@Body(ValidationPipe) loginDTO: LoginUserDto) {
    // ): Promise<ApiResponse<{ accessToken: string }>> {
    try {
      const accessToken = await this.userService.signin(loginDTO);
      return {
        statusCode: HttpStatus.OK,
        data: {
          accessToken,
        },
        error: null,
        message: 'Login successful',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.UNAUTHORIZED,
        data: null,
        error: 'Invalid credentials',
        message: 'Login failed',
      };
    }
  }

  @Patch('users/:userId')
  @UseGuards(AuthGurad)
  async updateUserProfile(
    @Param('userId') userId: number,
    @Body() updateUserProfileDTO: UpdateUserDto,
  ): Promise<any> {
    const updatedUser = await this.userService.updateUserProfile(
      userId,
      updateUserProfileDTO,
    );
    const { id, name, age } = updatedUser;
    const returnUpdatedUser = { id, name, age };
    return {
      statusCode: 200,
      data: {
        data: returnUpdatedUser,
      },
      message: 'User profile updated successfully',
    };
  }
}
