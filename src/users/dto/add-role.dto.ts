import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class AddRoleDto {
  @ApiProperty({
    example: 'ADMIN',
    description: 'Назва ролі',
  })
  @IsString({ message: 'Повинно бути строкою' })
  @Length(4, 16, { message: 'Не менше 4 та не більше 16 символів' })
  readonly value: string;
  @ApiProperty({
    example: 6723123213213,
    description: 'Id користувача',
  })
  @IsNumber({}, { message: 'Повинно бути числом' })
  readonly userId: number;
}