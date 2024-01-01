import { ApiProperty } from "@nestjs/swagger";
import { Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'Nest',
    description: 'назва статті',
  })
  readonly title: string;

  @ApiProperty({ example: 'Контент', description: 'наповнення статті' })
  @Length(4, 5000, { message: 'Не менше 4 та не більше 5000 символів' })
  readonly content: string;

  @ApiProperty({ example: 'Id користувача', description: '1414234234234' })
  readonly userId: string;
}