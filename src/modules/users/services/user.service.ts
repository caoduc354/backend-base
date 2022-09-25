import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { CreateUserDto, UpdateUserDto } from '../types/user.dto';
import { UserDocument } from '../types/user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: string): Promise<User> {
    return this.userModel.findOne(id as any).exec();
  }

  create(createTodoDto: CreateUserDto): Promise<User> {
    return new this.userModel({
      ...createTodoDto,
      createdAt: new Date(),
    }).save();
  }

  update(id: string, updateTodoDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateTodoDto).exec();
  }

  delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}
