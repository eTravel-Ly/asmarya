import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventSubscriptionController } from '../web/rest/event-subscription.controller';
import { EventSubscriptionRepository } from '../repository/event-subscription.repository';
import { EventSubscriptionService } from '../service/event-subscription.service';

@Module({
  imports: [TypeOrmModule.forFeature([EventSubscriptionRepository])],
  controllers: [EventSubscriptionController],
  providers: [EventSubscriptionService],
  exports: [EventSubscriptionService],
})
export class EventSubscriptionModule {}
