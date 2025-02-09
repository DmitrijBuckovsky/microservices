import { Module } from '@nestjs/common';
import { AlarmsGeneratorService } from './alarms-generator.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ScheduleModule } from '@nestjs/schedule';
import { ALARMS_SERVICE } from './constants';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ClientsModule.register([
      {
        name: ALARMS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
  ],
  providers: [AlarmsGeneratorService],
})
export class AlarmsGeneratorModule {}
