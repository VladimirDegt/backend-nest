import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        CatsModule,
        MongooseModule.forRoot(process.env.DB_URL),
    ]
})
export class AppModule {}