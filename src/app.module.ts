import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import * as path from 'path';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static')
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
    ]
})
export class AppModule {}