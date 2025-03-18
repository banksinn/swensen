import { AppModule } from '@/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import helmet from 'helmet';
import * as express from 'express';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TrimStringPipe } from '@/pipes/trim-string.pipe';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as buddhist from 'dayjs/plugin/buddhistEra';
import * as timezone from 'dayjs/plugin/timezone';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as duration from 'dayjs/plugin/duration';
dayjs.extend(buddhist);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalPipes(new TrimStringPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(helmet());
  app.use(compression());
  app.use(express.json({ limit: '6mb' }));
  const config = new DocumentBuilder()
    .setTitle('API Swensen Documentation')
    .setDescription('The documentation which used by swensen project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documents', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      filter: true,
    },
  });
  await app.listen(3000);
}
bootstrap();
