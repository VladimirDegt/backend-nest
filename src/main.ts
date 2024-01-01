import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from "./pipes/validation.pipe";
import * as cookieParser from 'cookie-parser';

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    // CORS
    app.enableCors({
        credentials: true,
        origin: "*",
    });
    // cookie
    try {
        app.use(cookieParser());
    } catch (e) {
        console.log('e.message-->', e.message)
    }

    // swagger
    const config = new DocumentBuilder()
        .setTitle('My template backend')
        .setDescription('Documentations REST API')
        .setVersion('1.0.0')
        .addTag('Volodymyr Dehtiarev')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    // обмеження доступу до усіх роутів не залогіненим користувачам
    // app.useGlobalGuards(JwtAuthGuard)
    // глобальна валідація по пайпам
    //   app.useGlobalPipes(new ValidationPipe())

    // connection
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
