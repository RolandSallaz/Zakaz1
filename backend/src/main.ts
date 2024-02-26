import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { EntityNotFoundExceptionFilter } from './common/filters/entity-not-found-exception.filter';
import { TypeOrmErrorMapperInterceptor } from './common/filters/typeormerrormapper.interceptor';
const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());
  app.useGlobalInterceptors(new TypeOrmErrorMapperInterceptor());
  app.enableCors();
  await app.listen(PORT, () => console.log('Server started'));
}
bootstrap();
