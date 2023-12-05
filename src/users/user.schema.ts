import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true, updatedAt: true
  }
})
export class User {
  @ApiProperty({example: 'example@gmail.com', description: "Пошта користувача"})
  @Prop()
  email: string

  @ApiProperty({example: '12345', description: "Пароль користувача"})
  @Prop()
  password: string

  @ApiProperty({example: 'true', description: "Забанен чи ні користувач"})
  @Prop()
  banned: boolean

  @ApiProperty({example: 'За флуд', description: "Причина блокування"})
  @Prop()
  bnReason: string
}

export const UserSchema = SchemaFactory.createForClass(User);