import { EventSubscription } from '../../domain/event-subscription.entity';
import { EventSubscriptionDTO } from '../dto/event-subscription.dto';

/**
 * A EventSubscription mapper object.
 */
export class EventSubscriptionMapper {
  static fromDTOtoEntity(entityDTO: EventSubscriptionDTO): EventSubscription {
    if (!entityDTO) {
      return;
    }
    let entity = new EventSubscription();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: EventSubscription): EventSubscriptionDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new EventSubscriptionDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
