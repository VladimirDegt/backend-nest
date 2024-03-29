import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from "./user.schema";
import { Model, Types } from 'mongoose';
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { HttpException } from "@nestjs/common/exceptions";
import { CreateTokenDto } from "src/token/dto/create-token.dto";
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userRepository: Model<UserDocument>,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const candidate = await this.userRepository.findOne({
      email: dto.email,
    });
    if (candidate) {
      throw new HttpException(
        'Користувач з такою поштою вжє інсує',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = new this.userRepository({
      ...dto,
      avatar: path.resolve(__dirname, 'image', 'avatar.png')
    });
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role]);
    return user.save();
  }

  async getAllUsers() {
    const users = await this.userRepository.find().populate('roles');
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email }).populate('roles');
    if (!user) {
      throw new HttpException(
        'Користувача не знайдено',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  async checkUserForRegistration(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException(
          'Така пошта вже зареєстрована',
          HttpStatus.BAD_REQUEST,
      );
    }
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findOne({
      _id: dto.userId,
    });
    const role = await this.roleService.getRoleByValue(dto.value);

    if (!user || !role) {
      throw new HttpException(
        'Користувач або роль не знайдено',
        HttpStatus.NOT_FOUND,
      );
    }

    const findRole = await this.userRepository.findOne({
      _id: dto.userId,
      roles: role,
    });

    if (findRole) {
      throw new HttpException('Така роль вже існує', HttpStatus.BAD_REQUEST);
    }

    user.roles.push(role);
    await user.save();
    return dto;
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findOne({ _id: dto.userId });
    if (!user) {
      throw new HttpException('Користувача не знайдено', HttpStatus.NOT_FOUND);
    }
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }

  async saveTokens(dto): Promise<User> {
    const user = await this.userRepository.findOne({
      email: dto.user.email,
    });
    if (!user) {
      throw new HttpException(
        'Користувача з такою поштою не інсує',
        HttpStatus.BAD_REQUEST,
      );
    }
    await user.$set('tokens', dto.tokenId._id);
    return user.save();
  }

  async delete(dto: User) {
    const user = await this.userRepository.findById(dto);
    if (!user) {
      throw new HttpException('Користувача не інсує', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.findByIdAndDelete(dto);
    return user;
  }

  async deleteToken(dto: Types.ObjectId) {
    const user = await this.userRepository.findById(dto);
    if (!user) {
      throw new HttpException('Користувача не інсує', HttpStatus.BAD_REQUEST);
    }
    const result = await this.userRepository.findByIdAndUpdate(dto, {tokens: []});
      return user._id
  }

  async getUserByIdToken(dto: Types.ObjectId): Promise<Types.ObjectId> {
    const user = await this.userRepository.findOne({ tokens: { $in: [dto] } })
    if (!user) {
      throw new HttpException('Користувача не інсує', HttpStatus.BAD_REQUEST);
    }
    return user._id
  }

  async getUserByID(dto: Types.ObjectId): Promise<User> {
      const user = await this.userRepository.findById(dto);
      if (!user) {
          throw new HttpException('Користувача не інсує', HttpStatus.BAD_REQUEST);
      }
      return user
  }

}
