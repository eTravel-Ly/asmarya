import { CartItem } from '../../domain/cart-item.entity';
import { CartItemDTO } from '../dto/cart-item.dto';

/**
 * A CartItem mapper object.
 */
export class CartItemMapper {
  static fromDTOtoEntity(entityDTO: CartItemDTO): CartItem {
    if (!entityDTO) {
      return;
    }
    let entity = new CartItem();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: CartItem): CartItemDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CartItemDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
