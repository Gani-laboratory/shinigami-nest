import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly Service: UserService) {}

  @Get()
  showAll() {
    return this.Service.getAll();
  }

  @Post()
  create(@Body('email') email: string, @Body('password') password: string) {
    return this.Service.create({ email, password });
  }

  @Get(':id')
  showById(@Param('id') id: string) {
    return this.Service.get('_id', id);
  }

  @Put(':id')
  edit(
    @Param('id') id: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.Service.edit(id, { email, password });
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.Service.delete(id);
  }
}
