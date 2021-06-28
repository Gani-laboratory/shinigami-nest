import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(320)
  email: string;

  @MaxLength(320)
  @MinLength(5)
  password: string;
}

export class UserPutDto {
  @IsOptional()
  @IsEmail()
  @MaxLength(320)
  email: string;

  @IsOptional()
  @MaxLength(320)
  @MinLength(5)
  password: string;
}
