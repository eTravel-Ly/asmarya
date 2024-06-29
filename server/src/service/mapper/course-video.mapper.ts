import { CourseVideo } from '../../domain/course-video.entity';
import { CourseVideoDTO } from '../dto/course-video.dto';

/**
 * A CourseVideo mapper object.
 */
export class CourseVideoMapper {
  static fromDTOtoEntity(entityDTO: CourseVideoDTO): CourseVideo {
    if (!entityDTO) {
      return;
    }
    let entity = new CourseVideo();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: CourseVideo): CourseVideoDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CourseVideoDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
