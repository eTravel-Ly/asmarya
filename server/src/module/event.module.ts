import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from '../web/rest/event.controller';
import { EventRepository } from '../repository/event.repository';
import { EventService } from '../service/event.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventRepository])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
