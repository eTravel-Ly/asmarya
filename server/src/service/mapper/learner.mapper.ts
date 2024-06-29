import { Learner } from '../../domain/learner.entity';
import { LearnerDTO } from '../dto/learner.dto';

/**
 * A Learner mapper object.
 */
export class LearnerMapper {
  static fromDTOtoEntity(entityDTO: LearnerDTO): Learner {
    if (!entityDTO) {
      return;
    }
    let entity = new Learner();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Learner): LearnerDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new LearnerDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
