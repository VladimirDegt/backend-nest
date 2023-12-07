import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
      example: 'example@gmail.com',
      description: 'Пошта користувача',
    })
    @IsString({message: 'Дані повині бути строкою'})
    @IsEmail({}, {message: 'Некоректний email'})
    readonly email: string;

    @ApiProperty({ example: '12345', description: 'Пароль користувача' })
    @IsString({message: 'Дані повинні бути строкою'})
    @Length(4, 16, {message: 'Не менше 4 та не більше 16 символів'})
    readonly password: string;
}