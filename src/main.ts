import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Would be possible to move this config to a separate file?
  const config = new DocumentBuilder()
    .setTitle('The Resident Zombie API')
    .setDescription('The Resident Zombie API is really chilling')
    .setVersion('1.0')
    .addTag('trz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
