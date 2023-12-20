import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response  } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';

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
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
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
  async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) response: Response) {
    const {tokens, username, email} = await this.authService.registration(userDto);
    response.cookie('refreshToken', tokens.refreshToken)
    return {
      token: tokens.accessToken,
      username: username,
      email: email
    }
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
  logout(@Body() tokenDto) {
    return this.authService.logout(tokenDto.token);
  }

  @ApiOperation({summary: 'Рефреш токен'})
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
  refresh(@Req() request: Request) {
    console.log(request.cookies)
  }
}
