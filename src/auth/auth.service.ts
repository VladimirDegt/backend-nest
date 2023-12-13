import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/user.schema';
import { TokenService } from "src/token/token.service";
import { CreateTokenDto } from "../token/dto/create-token.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private tokenService: TokenService,
    ) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)
        
        if (candidate) {
            throw new HttpException('Користувач з такою поштою вже існує', HttpStatus.BAD_REQUEST)
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
            token: tokenId._id,
            username: user.username,
            email: user.email,
            role: user.roles,
        };
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, roles: user.roles }
        return  {
            refreshToken: this.jwtService.sign(payload),
            accessToken: this.jwtService.sign(payload)
        }
    }

    public async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if (user && passwordEquals) {
            return user
        }
        throw new UnauthorizedException({ message: 'Невірний email або пароль' });
    }
}
