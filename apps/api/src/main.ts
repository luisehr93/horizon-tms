import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://horizontruck.netlify.app',
    ],
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const port = Number(process.env.PORT) || 8080;
  await app.listen(port, '0.0.0.0');

  console.log(`Horizon TMS API running on port ${port}`);
}
bootstrap();
