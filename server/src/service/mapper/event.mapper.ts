import { Event } from '../../domain/event.entity';
import { EventDTO } from '../dto/event.dto';

/**
 * A Event mapper object.
 */
export class EventMapper {
  static fromDTOtoEntity(entityDTO: EventDTO): Event {
    if (!entityDTO) {
      return;
    }
    let entity = new Event();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Event): EventDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new EventDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
