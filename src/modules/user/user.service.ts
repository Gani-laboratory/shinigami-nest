import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async getAll() {
    const user = await this.UserModel.find();
    if (!user.length)
      throw new HttpException('no user registered', HttpStatus.NO_CONTENT);
    return user;
  }

  async get(key: string, value: string) {
    try {
      const user = await this.UserModel.findOne({ [key]: value });
      if (!user)
        throw new HttpException(
          `user with ${key} ${value} not found`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (e) {
      if (e.name === 'CastError')
        throw new HttpException('wrong user id', HttpStatus.BAD_REQUEST);
      throw e;
    }
  }

  async create(body: Pick<UserDocument, 'email' | 'password'>) {
    try {
      return await (await this.UserModel.create(body)).save();
    } catch (e) {
      if (e.name === 'MongoError')
        throw new HttpException(
          'this email has been used',
          HttpStatus.CONFLICT,
        );
      throw e;
    }
  }

  async edit(_id: string, body: Pick<UserDocument, 'email' | 'password'>) {
    try {
      const user = await this.UserModel.findOneAndUpdate({ _id }, body, {
        new: true,
      });
      if (!user)
        throw new HttpException(
          `user with id ${_id} not found`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (e) {
      if (e.name === 'MongoError')
        throw new HttpException(
          'this email has been used',
          HttpStatus.CONFLICT,
        );
      else if (e.name === 'CastError')
        throw new HttpException('wrong user id', HttpStatus.BAD_REQUEST);
      throw e;
    }
  }

  async delete(_id: string) {
    try {
      const user = await this.UserModel.findOneAndDelete({ _id });
      if (!user)
        throw new HttpException(
          `user with id ${_id} not found`,
          HttpStatus.NOT_FOUND,
        );
      return user;
    } catch (e) {
      if (e.name === 'CastError')
        throw new HttpException('wrong user id', HttpStatus.BAD_REQUEST);
      throw e;
    }
  }
}
