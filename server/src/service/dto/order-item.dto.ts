/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { OrderDTO } from './order.dto';
import { BookDTO } from './book.dto';
import { CourseDTO } from './course.dto';

/**
 * A OrderItemDTO object.
 */
export class OrderItemDTO extends BaseDTO {
  @ApiProperty({ description: 'total field', required: false })
  total: number;

  @ApiProperty({ description: 'discount field', required: false })
  discount: number;

  @ApiProperty({ type: () => OrderDTO, description: 'order relationship' })
  order: OrderDTO;

  @ApiProperty({ type: () => BookDTO, description: 'book relationship' })
  book: BookDTO;

  @ApiProperty({ type: () => CourseDTO, description: 'course relationship' })
  course: CourseDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
