import { BookBorrowRequest } from '../../domain/book-borrow-request.entity';
import { BookBorrowRequestDTO } from '../dto/book-borrow-request.dto';

/**
 * A BookBorrowRequest mapper object.
 */
export class BookBorrowRequestMapper {
  static fromDTOtoEntity(entityDTO: BookBorrowRequestDTO): BookBorrowRequest {
    if (!entityDTO) {
      return;
    }
    let entity = new BookBorrowRequest();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: BookBorrowRequest): BookBorrowRequestDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new BookBorrowRequestDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
