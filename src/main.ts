import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './pipes/AllExceptionsFilter.pipe';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // app.use(helmet());
  // app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true}))


  const logger = new Logger('Bootstrap')
  logger.log(`Application is starting`)

  app.enableCors({
    origin:true,
    credentials:true
  })

  app.useGlobalPipes(
    new ValidationPipe(
    {
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true,
    }
    )
  )

  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle('transfer-vehicles-module')
    .setDescription('Technical test for moraleda gestion')
    .setVersion('1.0')
    .addTag('transfer-vehicles-module')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
