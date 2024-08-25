import { EntityRepository, Repository } from 'typeorm';
import { EventSubscription } from '../domain/event-subscription.entity';

@EntityRepository(EventSubscription)
export class EventSubscriptionRepository extends Repository<EventSubscription> {}
