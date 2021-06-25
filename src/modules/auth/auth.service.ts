import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserDto } from 'src/filters/user.filter';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private _createToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return {
      expiresIn: process.env.EXPIRES_IN,
      token,
    };
  }

  async login(payload: UserDto) {
    const user = await this.userService.get('email', payload.email);
    if (!compare(payload.password, user.password))
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    return this._createToken({ _id: user._id });
  }

  async validateUser(payload: JwtPayload) {
    return await this.userService.get(
      '_id',
      payload._id,
      'Invalid token',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
