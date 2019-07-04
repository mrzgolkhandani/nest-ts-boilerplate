import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { logger } from './utils/middlewares/logger.middleware';
import { TransformApiInterceptor, HttpExceptionFilter, ErrorsInterceptor } from './utils/api.response';

/// for different approaches just follow the tag
/// OTHER_WAY
/// for example OTHER_WAY_MONGOOSE for different type of connection for mongo
const morgan = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // add a global middleware
  app.use(logger)
  // general middlewar => u can use js module importer
  app.use(morgan("dev"));
  app.use(compress());
  app.use(methodOverride());
  app.use(helmet());
  app.use(cors());

  // add global filter
   app.useGlobalFilters(new HttpExceptionFilter());
  //
  app.useGlobalInterceptors(new TransformApiInterceptor());
  //app.useGlobalInterceptors(new ErrorsInterceptor());


  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();