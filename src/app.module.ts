import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist';
import { TokenModule } from './token/token.module';
import { CustomersModule } from './customers/customers.module';
import * as path from 'path';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
    imports: [
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, '../static')
        }),
        MongooseModule.forRoot(process.env.DB_URL),
        UsersModule,
        RolesModule,
        AuthModule,
        PostsModule,
        FilesModule,
        TokenModule,
        CustomersModule,
    ]
})
export class AppModule {}