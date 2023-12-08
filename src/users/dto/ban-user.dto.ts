import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class BanUserDto {
  @ApiProperty({
    example: 6723123213213,
    description: 'Id користувача',
  })
  @IsNumber({}, { message: 'Дані повині бути числом' })
    readonly userId: number;
    
  @ApiProperty({ example: 'Флудив', description: 'Опис причини бану' })
  @IsString({ message: 'Дані повинні бути строкою' })
  @Length(4, 16, { message: 'Не менше 4 та не більше 16 символів' })
  readonly banReason: string;
}