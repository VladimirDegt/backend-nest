import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "./user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { HttpException } from "@nestjs/common/exceptions";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userRepository: Model<UserDocument>,
        private roleService: RolesService
    ) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const candidate = await this.userRepository.findOne({
            email: dto.email,
        });
        if (candidate) {
            throw new HttpException(
                'Такий користувач існує',
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = new this.userRepository(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role])
        return user.save()
    }

    async getAllUsers() {
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
        const user = await this.userRepository.findOne({
            _id: dto.userId,
        });
        const role = await this.roleService.getRoleByValue(dto.value);

        if (!user || !role) {
            throw new HttpException('Користувач або роль не знайдено', HttpStatus.NOT_FOUND)
        }

        const findRole = await this.userRepository.findOne({
            _id: dto.userId,
            roles: role,
        });

        if (findRole) {
            throw new HttpException('Така роль вже існує', HttpStatus.BAD_REQUEST)
        }

        user.roles.push(role);
        await user.save();
        return dto
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findOne({ _id: dto.userId });
        if (!user) {
            throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND)
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user
    }
}
