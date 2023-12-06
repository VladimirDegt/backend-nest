import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./user.schema";
import { UseGuards } from "@nestjs/common/decorators";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({summary: "Створення користувача"})
    @ApiResponse({status: 201, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @ApiOperation({summary: "Отримання усіх користувачів"})
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard) // обмеження доступу до роута не залогіненим користувачам
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }
}
