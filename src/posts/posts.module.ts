import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilesModule } from 'src/files/files.module';
import { User, UserSchema } from 'src/users/user.schema';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { Post, PostSchema } from './posts.schema';
import { PostsService } from './posts.service';

@Module({
    controllers: [PostsController],
    providers: [PostsService],
    imports: [
        UsersModule,
        PostsModule,
        FilesModule,
        MongooseModule.forFeature([
            { name: Post.name, schema: PostSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
})
export class PostsModule { }
