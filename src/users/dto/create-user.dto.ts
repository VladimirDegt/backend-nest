import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'MyName',
    description: "Ім'я користувача",
  })
  @IsString({ message: 'Дані повині бути строкою' })
  @Length(4, 16, { message: 'Не менше 4 та не більше 16 символів' })
  @IsNotEmpty({ message: 'Поле username відсутнє або пусте' })
  readonly username: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Пошта користувача',
  })
  @IsString({ message: 'Дані повині бути строкою' })
  @Length(4, 16, { message: 'Не менше 4 та не більше 16 символів' })
  @IsEmail({}, { message: 'Некоректний email' })
  @IsNotEmpty({ message: 'Поле email відсутнє або пусте' })
  readonly email: string;

  @ApiProperty({ example: '12345', description: 'Пароль користувача' })
  @IsString({ message: 'Дані повинні бути строкою' })
  @Length(4, 16, { message: 'Не менше 4 та не більше 16 символів' })
  @IsNotEmpty({ message: 'Поле password відсутнє або пусте' })
  @NotContains(' ', { message: 'Пароль не повинен містити пробіли' })
  readonly password: string;
}