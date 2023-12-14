import { Injectable } from '@nestjs/common';
import { CreateTokenDto, TokenOnly } from './dto/create-token.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './token.schema';
import { Model, Types } from 'mongoose';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name)
        private tokenRepository: Model<TokenDocument>,
    ) { }

    public async saveTokens(dto: CreateTokenDto) {
        const { user, tokens } = dto;
        const newToken = new Token();
        newToken.accessToken = tokens.accessToken;
        newToken.refreshToken = tokens.refreshToken;
        newToken.user = user;

        const createdToken = new this.tokenRepository(newToken);
        return createdToken.save();
    }

    public async getById(dto: string) {
        
        let objectId: Types.ObjectId;
            try {
              objectId = new Types.ObjectId(dto);
            } catch (error) {
              throw new HttpException(
                'Неверний формат id токена',
                HttpStatus.BAD_REQUEST,
              );
        }
        const findToken = await this.tokenRepository.findById(objectId);

        if (!findToken) {
            throw new HttpException(
                'Токена не існує',
                HttpStatus.BAD_REQUEST,
            );
        }
        await this.tokenRepository.findByIdAndDelete(findToken._id);
        return findToken.user
    }
}
