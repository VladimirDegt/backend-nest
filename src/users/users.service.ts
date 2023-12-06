import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<UserDocument>,
        private roleService: RolesService
    ) { }

    async createUser(dto: CreateUserDto):Promise<User>{
        const user = new this.userRepository(dto);
        const role = await this.roleService.getRoleByValue("ADMIN");
        await user.$set('roles', [role])
        return user.save()
    }

    async getAllUsers(){
        const users = await this.userRepository.find().populate('roles');
        return users
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository
          .findOne({ email })
            .populate('roles');
        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findById(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        console.log("user-->", user)
        console.log("role-->", role)
    }

    async ban(dto: BanUserDto) {
        
    }
}
