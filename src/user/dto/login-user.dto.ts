import { PartialType } from '@nestjs/mapped-types';
import { SignupUserDto } from './signup-user.dto';

// {
//     "email": "farheenriyaz14@gmail.com",
//     "password": "!Far@heen"
//   }
export class LoginUserDto extends PartialType(SignupUserDto) {}
