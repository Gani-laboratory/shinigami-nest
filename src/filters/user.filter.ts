import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(320)
  email: string;

  @MaxLength(320)
  @MinLength(5)
  password: string;
}
