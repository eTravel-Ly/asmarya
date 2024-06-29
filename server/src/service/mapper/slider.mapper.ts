import { Slider } from '../../domain/slider.entity';
import { SliderDTO } from '../dto/slider.dto';

/**
 * A Slider mapper object.
 */
export class SliderMapper {
  static fromDTOtoEntity(entityDTO: SliderDTO): Slider {
    if (!entityDTO) {
      return;
    }
    let entity = new Slider();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Slider): SliderDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new SliderDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
