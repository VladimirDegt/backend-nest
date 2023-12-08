import { ApiProperty } from "@nestjs/swagger";

export class CreatePostDto {
  @ApiProperty({
    example: 'Nest',
    description: 'назва статті',
  })
  readonly title: string;

  @ApiProperty({ example: 'Контент', description: 'наповнення статті' })
  readonly content: string;

  @ApiProperty({ example: 'Id користувача', description: '1414234234234' })
  readonly userId: string;
}