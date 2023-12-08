import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Post {
  @ApiProperty({
    example: 'Nest',
    description: 'назва статті',
  })
  @Prop()
  title: string;

  @ApiProperty({ example: 'Контент', description: 'наповнення статті' })
  @Prop()
  content: string;

  @ApiProperty({ example: 'photo.jpg', description: 'файл з фото' })
  @Prop()
  image: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  author: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
