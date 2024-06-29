import { Favorite } from '../../domain/favorite.entity';
import { FavoriteDTO } from '../dto/favorite.dto';

/**
 * A Favorite mapper object.
 */
export class FavoriteMapper {
  static fromDTOtoEntity(entityDTO: FavoriteDTO): Favorite {
    if (!entityDTO) {
      return;
    }
    let entity = new Favorite();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Favorite): FavoriteDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new FavoriteDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
