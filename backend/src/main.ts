import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TypeOrmErrorMapperInterceptor } from './common/filters/typeormerrormapper.interceptor';
require('dotenv').config();

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TypeOrmErrorMapperInterceptor());
  app.enableCors();
  await app.listen(PORT, () => console.log('Server started'));
}
bootstrap();
