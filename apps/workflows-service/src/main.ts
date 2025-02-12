import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './workflows-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowsServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  
  app.connectMicroservice<MicroserviceOptions>(
    {
      // transport: Transport.NATS,
      transport: Transport.RMQ,
      options: {
        // servers: process.env.NATS_URL,
        // queue: 'workflows-service',
        urls: [process.env.RABBITMQ_URL], // 👈
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
