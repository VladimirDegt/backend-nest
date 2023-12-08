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

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    RolesModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
      { name: Post.name, schema: PostSchema },
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
