import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  app.enableCors({
    origin: config.get<string>('CORS_ALLOWED_ORIGINS'),
  });

  await app.listen(config.get<string>('PORT') || 3000);
}
bootstrap();
