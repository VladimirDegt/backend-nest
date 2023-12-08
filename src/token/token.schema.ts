import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';


export type TokenDocument = HydratedDocument<Token>;

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: true,
  },
})
export class Token {
  @ApiProperty({
    description: 'refresh token',
  })
  @Prop()
  refreshToken: string;

  @ApiProperty({
    description: 'id користувача',
  })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] } )
  user: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);