import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<UserDocument>,
        private roleService: RolesService
    ) { }

  async createUser(dto: CreateUserDto):Promise<User>{
      const user = new this.userRepository(dto);
      const role = await this.roleService.getRoleByValue("USER");
      await user.$set('roles', [role])
      return user.save()
  }

  async getAllUsers(){
      const users = await this.userRepository.find().populate('roles');
      return users
  }
}
