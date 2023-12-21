import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import {
  HttpException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/user.schema';
import { TokenService } from 'src/token/token.service';
import * as process from 'process';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    const tokens = await this.generateToken(user);
    const tokenId = await this.tokenService.saveTokens({ user, tokens });
    await this.userService.saveTokens({ user, tokenId });
    return {
      tokens,
      username: user.username,
      email: user.email,
    };
  }

  async registration(userDto: CreateUserDto) {
      const candidate = await this.userService.getUserByEmail(userDto.email);
      
    if (candidate) {
      throw new HttpException(
        'Користувач з такою поштою вже існує',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    const tokens = await this.generateToken(user);
    const tokenId = await this.tokenService.saveTokens({ user, tokens });
    await this.userService.saveTokens({ user, tokenId });
    return {
      tokens,
      username: user.username,
      email: user.email,
    };
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, roles: user.roles };
    return {
      accessToken: this.jwtService.sign({ ...payload, key: process.env.JWT_ACCESS_TOKEN }, {expiresIn: '15m'}),
      refreshToken: this.jwtService.sign({ ...payload, key: process.env.JWT_REFRESH_TOKEN }, {expiresIn: '30d'}),
    };
  }

  public async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Невірний email або пароль' });
  }

    public async logout(token: string) {
        const tokenId: Types.ObjectId = await this.tokenService.getIdAccessToken(token);
        const deleteToken = await this.tokenService.deleteTokenById(tokenId);
        const userId = await this.userService.getUserByIdToken(tokenId);
        await this.userService.deleteToken(userId);
        return {
          message: "Токен видалено",
          accessToken: deleteToken.accessToken,
          user: userId
        };
  }

  public async refresh(refreshToken){
    if(!refreshToken){
      throw new UnauthorizedException({ message: 'Токен відсутній' })
    }
    const validateToken = await this.jwtService.verify(refreshToken);
    if(!validateToken) {
      throw new HttpException(
        'Не валідний токен',
        HttpStatus.BAD_REQUEST,
      );
    }

    const findToken = await this.tokenService.getIdRefreshToken(refreshToken);
      if (!findToken) {
        throw new UnauthorizedException({ message: 'Токен відсутній' })
      }

      const userId = await this.userService.getUserByIdToken(findToken);
      const user = await this.userService.getUserByID(userId)
    const tokens = await this.generateToken(user);
    const tokenId = await this.tokenService.saveTokens({ user, tokens });
    await this.userService.saveTokens({ user, tokenId });
    return {
      tokens,
      username: user.username,
      email: user.email,
    };
  }
}
