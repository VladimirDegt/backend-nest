import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        CatsModule,
        MongooseModule.forRoot(
            'mongodb+srv://vladimirr:E0b2mNwKL1bG77j1@cluster0.ogz1o8j.mongodb.net/',
        ),
    ], 
})
export class AppModule {}