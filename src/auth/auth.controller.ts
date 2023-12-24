import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { TokenOnly } from '../token/dto/create-token.dto';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@ApiTags('Авторизація')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Логін користувача' })
  @ApiResponse({
    status: 201,
    content: {
      'application/json': {
        example: {
          token: '21321321321',
        },
      },
    },
  })
  @Post('/login')
  async login(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { tokens, username, email } = await this.authService.login(userDto);
    response.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    return {
      token: tokens.accessToken,
      username: username,
      email: email,
    };
  }

  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({
    status: 201,
    content: {
      'application/json': {
        example: {
          token: '21321321321',
        },
      },
    },
  })
  @Post('/registration')
  async registration(
    @Body() userDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { tokens, username, email } =
      await this.authService.registration(userDto);
    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
    });
    return {
      token: tokens.accessToken,
      username: username,
      email: email,
    };
  }

  @ApiOperation({ summary: 'Логаут користувача' })
  @ApiResponse({
    status: 201,
    content: {
      'application/json': {
        example: {
          token: '21321321321',
        },
      },
    },
  })
  @Post('/logout')
  logout(
    @Body() tokenDto: TokenOnly,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('refreshToken');
    return this.authService.logout(tokenDto.token);
  }

  @ApiOperation({ summary: 'Рефреш токен' })
  @ApiResponse({
    status: 201,
    content: {
      'application/json': {
        example: {
          token: '21321321321',
        },
      },
    },
  })
  @Get('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = req.cookies['refreshToken'];
    try {
      const { tokens, username, email } =
        await this.authService.refresh(refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      return {
        token: tokens.accessToken,
        username: username,
        email: email,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
