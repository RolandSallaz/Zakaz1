import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { TypeOrmErrorMapperInterceptor } from './common/filters/typeormerrormapper.interceptor';
import helmet from 'helmet';
import { QueryFailedInterceptor } from './common/filters/query-failed.interceptor';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  app.setGlobalPrefix(process.env.DEV ? '' : 'api');
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  // app.use(bodyParser.json({ limit: '10mb' })); // Установка максимального размера тела запроса
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TypeOrmErrorMapperInterceptor());
  app.useGlobalInterceptors(new QueryFailedInterceptor());
  await app.listen(PORT, () => console.log('Server started'));
}
bootstrap();
