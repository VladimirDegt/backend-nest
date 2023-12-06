import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, RoleDocument } from './roles.schema';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role.name) private roleRepository: Model<RoleDocument>) { }
    
    async createRole(dto: CreateRoleDto): Promise<Role> {
        const role = new this.roleRepository(dto)
        return role.save()
    }

    async getRoleByValue(value: string): Promise<Role> {
        const role = await this.roleRepository.findOne({value})
        return role
    }
}
