import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './roles.schema';
import { RolesService } from './roles.service';

@ApiTags('Ролі користувачів')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }
    
    @ApiOperation({ summary: "Створення ролі" })
    @ApiResponse({
        status: 201, type: Role
    })
    @Post()
    create(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto)
    }

    @ApiOperation({ summary: "Отримання ролі" })
    @ApiResponse({
        status: 200, type: [Role]
    })
    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
}
