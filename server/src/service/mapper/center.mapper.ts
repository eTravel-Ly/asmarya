import { Center } from '../../domain/center.entity';
import { CenterDTO } from '../dto/center.dto';

/**
 * A Center mapper object.
 */
export class CenterMapper {
  static fromDTOtoEntity(entityDTO: CenterDTO): Center {
    if (!entityDTO) {
      return;
    }
    let entity = new Center();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Center): CenterDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CenterDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
