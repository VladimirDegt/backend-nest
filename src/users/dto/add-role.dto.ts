import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @IsString( {message: 'Повинно бути строкою'})
    readonly value: string;
    @IsNumber( {}, {message: 'Повинно бути числом'})
    readonly userId: number;
}