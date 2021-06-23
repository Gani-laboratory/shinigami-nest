import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsNotEmpty()
  @MaxLength(500)
  @MinLength(5)
  password: string;
}
