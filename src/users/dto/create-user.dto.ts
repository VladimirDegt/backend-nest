import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Пошта користувача',
  })
  readonly email: string;
  @ApiProperty({ example: '12345', description: 'Пароль користувача' })
  readonly password: string;
}