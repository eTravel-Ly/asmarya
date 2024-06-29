/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Book } from './book.entity';
import { Learner } from './learner.entity';
import { BookBorrowRequestStatus } from './enumeration/book-borrow-request-status';

/**
 * A BookBorrowRequest.
 */
@Entity('book_borrow_request')
export class BookBorrowRequest extends BaseEntity {
  @Column({ type: 'datetime', name: 'request_date', nullable: true })
  requestDate: any;

  @Column({ type: 'datetime', name: 'collect_date', nullable: true })
  collectDate: any;

  @Column({ type: 'datetime', name: 'return_date', nullable: true })
  returnDate: any;

  @Column({ type: 'simple-enum', name: 'book_borrow_request_status', enum: BookBorrowRequestStatus })
  bookBorrowRequestStatus: BookBorrowRequestStatus;

  @ManyToOne(type => Book)
  book: Book;

  @ManyToOne(type => Learner)
  learner: Learner;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
