import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userRepository: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto):Promise<User>{
      const user = new this.userRepository(dto)
      return user.save()
  }

  async getAllUsers(){
      const users = await this.userRepository.find();
      return users
  }
}
