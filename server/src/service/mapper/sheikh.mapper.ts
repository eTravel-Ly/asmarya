import { Sheikh } from '../../domain/sheikh.entity';
import { SheikhDTO } from '../dto/sheikh.dto';

/**
 * A Sheikh mapper object.
 */
export class SheikhMapper {
  static fromDTOtoEntity(entityDTO: SheikhDTO): Sheikh {
    if (!entityDTO) {
      return;
    }
    let entity = new Sheikh();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Sheikh): SheikhDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new SheikhDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
