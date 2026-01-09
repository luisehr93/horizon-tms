import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://horizontruck.netlify.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

  const allowlist = new Set([
    'http://localhost:5173',
  ]);

  app.enableCors({
    origin: (origin, callback) => {
      // Permite requests server-to-server o herramientas sin origin
      if (!origin) return callback(null, true);

      // Permite tu localhost
      if (allowlist.has(origin)) return callback(null, true);

      // Permite cualquier subdominio netlify.app (tu site de producción)
      if (/^https:\/\/.*\.netlify\.app$/.test(origin)) return callback(null, true);

      return callback(new Error(`CORS blocked for origin: ${origin}`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
