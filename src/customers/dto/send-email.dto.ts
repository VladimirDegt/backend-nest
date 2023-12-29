import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({
    example: 'Шановні клієнти!',
    description: 'текст повідомлення',
  })
  @IsString({ message: 'Повинно бути строкою' })
  @Length(1, 5000, { message: 'Не менше 1 та не більше 5000 символів' })
  readonly content: string;
}
