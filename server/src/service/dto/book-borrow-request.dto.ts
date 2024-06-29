/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BookBorrowRequestStatus } from '../../domain/enumeration/book-borrow-request-status';
import { BaseDTO } from './base.dto';

import { BookDTO } from './book.dto';
import { LearnerDTO } from './learner.dto';

/**
 * A BookBorrowRequestDTO object.
 */
export class BookBorrowRequestDTO extends BaseDTO {
  @ApiProperty({ description: 'requestDate field', required: false })
  requestDate: any;

  @ApiProperty({ description: 'collectDate field', required: false })
  collectDate: any;

  @ApiProperty({ description: 'returnDate field', required: false })
  returnDate: any;

  @ApiProperty({ enum: BookBorrowRequestStatus, description: 'bookBorrowRequestStatus enum field', required: false })
  bookBorrowRequestStatus: BookBorrowRequestStatus;

  @ApiProperty({ type: () => BookDTO, description: 'book relationship' })
  book: BookDTO;

  @ApiProperty({ type: () => LearnerDTO, description: 'learner relationship' })
  learner: LearnerDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
