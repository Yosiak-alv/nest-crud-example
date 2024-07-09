import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // add this line for registering the class-validator with the NestJS container
  await app.listen(3000);
}
bootstrap();
