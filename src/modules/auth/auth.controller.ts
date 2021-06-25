import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from 'src/filters/user.filter';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() payload: UserDto) {
    return await this.authService.login(payload);
  }
}
