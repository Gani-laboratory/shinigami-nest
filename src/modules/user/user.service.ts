import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return await this.UserModel.find();
  }

  async get(key: string, value: string) {
    return await this.UserModel.findOne({ _id: value });
  }

  async create(body: Pick<UserDocument, 'email' | 'password'>) {
    return await (await this.UserModel.create(body)).save();
  }

  async edit(_id: string, body: Pick<UserDocument, 'email' | 'password'>) {
    return await this.UserModel.findOneAndUpdate({ _id }, body, { new: true });
  }

  async delete(_id: string) {
    return await this.UserModel.findOneAndDelete({ _id });
  }
}
