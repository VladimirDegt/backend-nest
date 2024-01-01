import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ValidationPipe } from "./pipes/validation.pipe";
// import * as cookieParser from 'cookie-parser';
const cookieParser = require('cookie-parser');

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    // CORS
    app.enableCors({
        credentials: true,
        origin: "*",
    });
    // cookie
    app.use(cookieParser());

    // swagger
    const config = new DocumentBuilder()
        .setTitle('My template backend')
        .setDescription('Documentations REST API')
        .setVersion('1.0.0')
        .addTag('Volodymyr Dehtiarev')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document, {
        customSiteTitle: 'Backend Generator',
            customfavIcon: 'https://avatars.githubusercontent.com/u/6936373?s=200&v=4',
        customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
        customCssUrl: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
    });

    // обмеження доступу до усіх роутів не залогіненим користувачам
    // app.useGlobalGuards(JwtAuthGuard)
    // глобальна валідація по пайпам
    //   app.useGlobalPipes(new ValidationPipe())

    // connection
    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
