import { Body, Controller, Post } from '@nestjs/common';
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
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
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
}
