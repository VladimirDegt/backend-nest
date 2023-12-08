import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/roles/roles.schema";
import { Post } from "src/posts/posts.schema";

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

    @ApiProperty({
        example: '[ADMIN, USER]',
        description: 'Перелік ролей користувача',
    })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }] })
    roles: Role[];

    @ApiProperty({
        example: '[post_1, post_2]',
        description: 'Перелік постов користувача',
    })
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
    posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);