import { Injectable } from "@nestjs/common";
import { CreateTokenDto } from "./dto/create-token.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Token, TokenDocument } from "./token.schema";
import { Model } from "mongoose";

@Injectable()
export class TokenService {
    constructor(
        @InjectModel(Token.name)
        private tokenRepository: Model<TokenDocument>,
    ) {
    }
    async saveTokens (dto: CreateTokenDto){
        const { user, tokens } = dto;
        const newToken = new Token();
        newToken.accessToken = tokens.accessToken;
        newToken.refreshToken = tokens.refreshToken;
        newToken.user = user

        const createdToken = new this.tokenRepository(newToken);
        return createdToken.save();
    }
}
