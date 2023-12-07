import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class User {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Пошта користувача',
  })
  @Prop()
  email: string;

  @ApiProperty({ example: '12345', description: 'Пароль користувача' })
  @Prop()
  password: string;

  @ApiProperty({ example: 'true', description: 'Забанен чи ні користувач' })
  @Prop()
  banned: boolean;

  @ApiProperty({ example: 'За флуд', description: 'Причина блокування' })
  @Prop()
  banReason: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);