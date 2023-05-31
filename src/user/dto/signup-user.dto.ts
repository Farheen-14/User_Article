import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Length,
  Matches,
  ValidateIf,
  MaxLength,
  MinLength,
  IsInt,
  Min,
} from 'class-validator';

// example
// {
//   "name": "farheen",
// "email": "farheenriyaz14@gmail.com",
// "password": "!Far@heen"
// }
export class SignupUserDto {
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsString()
  public readonly email!: string;

  @ValidateIf((o) => !o.isSocial, { message: 'Password is required' })
  @Length(8, 20, { message: 'Password should be 8 to 20 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain at least 1 uppercase character, 1 lowercase character and 1 digit example: !Far@heen',
  })
  @IsString()
  public readonly password!: string;

  @ValidateIf((o) => !o.isSocial, { message: 'Name is required' })
  @IsNotEmpty({ message: 'Name is required!' })
  @MinLength(2)
  @MaxLength(30)
  public readonly name!: string;

  @IsInt()
  @Min(18)
  age: number;
}
