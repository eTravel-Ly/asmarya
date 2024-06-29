import { Activation } from '../../domain/activation.entity';
import { ActivationDTO } from '../dto/activation.dto';

/**
 * A Activation mapper object.
 */
export class ActivationMapper {
  static fromDTOtoEntity(entityDTO: ActivationDTO): Activation {
    if (!entityDTO) {
      return;
    }
    let entity = new Activation();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Activation): ActivationDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ActivationDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
