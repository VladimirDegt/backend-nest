import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, UserSchema } from "./user.schema";
import { Role, RoleSchema } from 'src/roles/roles.schema';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { Post, PostSchema } from 'src/posts/posts.schema';
import { Token, TokenSchema } from 'src/token/token.schema';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
      RolesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Post.name, schema: PostSchema },
      { name: Token.name, schema: TokenSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
