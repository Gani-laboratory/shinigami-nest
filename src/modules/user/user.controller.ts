import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly Service: UserService) {}

  @Get()
  showAll() {
    return this.Service.getAll();
  }

  @Post()
  create(@Body() body: Record<string, string>) {
    return body.ok;
  }
}
