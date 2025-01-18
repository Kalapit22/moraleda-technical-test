import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.use(helmet());
  // app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true}))

  app.enableCors({
    origin:true,
    credentials:true
  })

  

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
