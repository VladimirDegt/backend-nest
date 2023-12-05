import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // swagger
  const  config = new DocumentBuilder()
      .setTitle('My template backend')
      .setDescription('Documentations REST API')
      .setVersion('1.0.0')
      .addTag('Volodymyr Dehtiarev')
      .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  // connection
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
