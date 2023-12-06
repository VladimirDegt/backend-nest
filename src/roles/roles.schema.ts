import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/users/user.schema";

export type RoleDocument = HydratedDocument<Role>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Role {
  @ApiProperty({ example: 'ADMIN', description: 'унікальний ідентифікатор' })
  @Prop()
  value: string;

  @ApiProperty({
    example: 'Адміністратор',
    description: 'Опис ролі',
  })
  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
    users: User[];

}

export const RoleSchema = SchemaFactory.createForClass(Role);