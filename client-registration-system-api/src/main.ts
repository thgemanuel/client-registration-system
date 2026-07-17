import 'module-alias/register';

import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { RootModule } from './root.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DomainExceptionFilter } from '@infrastructure/filters/domain-exception.filter';
import { GeneralExceptionFilter } from '@infrastructure/filters/general-exception.filter';
import { customExceptionFactoryValidationPipe } from '@infrastructure/pipes/custom-exception-factory-validation-pipe';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(RootModule);

  const logger = new Logger('Application');

  process.on('uncaughtException', (error) => {
    logger.error(error);
  });

  app.useGlobalPipes(customExceptionFactoryValidationPipe());
  app.useGlobalFilters(
    new GeneralExceptionFilter(logger),
    new DomainExceptionFilter(logger),
  );

  const config = new DocumentBuilder()
    .setTitle('Client Registration Service')
    .setDescription('Serviço responsável pelo cadastro de clientes')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
