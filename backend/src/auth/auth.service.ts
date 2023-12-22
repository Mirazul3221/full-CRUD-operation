import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { UpdateAuthDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { user, user_model } from './Schema/user.schema';
import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(user_model)
    private userModel: mongoose.Model<user>,
  ) {}
  async register_user(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const userInfo = await this.userModel.findOne({ email });
    if (userInfo) {
      throw new ConflictException('User already exist');
    } else {
      const new_user = this.userModel.create({
        name: name.trim(),
        email: email.trim(),
        password: await bcrypt.hash(password, 9),
      });
    }
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
