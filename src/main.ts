import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { tenancyMiddleware } from './tenancy/tenancy.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(tenancyMiddleware);

  app.enableCors();

  app.setGlobalPrefix(':tenant?/api');

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true})
  );

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'SANCON CLOCK API',
    useGlobalPrefix: false,
  };

  const documentOptions: SwaggerDocumentOptions = {
    ignoreGlobalPrefix: false,
    deepScanRoutes: true
  };

  const config = new DocumentBuilder()
    .setTitle('SANCON CLOCK API')
    .setDescription('SANCON CLOCK API')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(process.env.URL_API, "Development server")
    .build();

  const document = SwaggerModule.createDocument(app, config, documentOptions);

  SwaggerModule.setup('docs', app, document, customOptions);

  await app.listen(4000);
}
bootstrap();
