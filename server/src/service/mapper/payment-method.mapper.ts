import { PaymentMethod } from '../../domain/payment-method.entity';
import { PaymentMethodDTO } from '../dto/payment-method.dto';

/**
 * A PaymentMethod mapper object.
 */
export class PaymentMethodMapper {
  static fromDTOtoEntity(entityDTO: PaymentMethodDTO): PaymentMethod {
    if (!entityDTO) {
      return;
    }
    let entity = new PaymentMethod();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: PaymentMethod): PaymentMethodDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new PaymentMethodDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
