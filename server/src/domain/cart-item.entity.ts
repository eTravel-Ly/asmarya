/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Learner } from './learner.entity';
import { Book } from './book.entity';
import { Course } from './course.entity';

/**
 * A CartItem.
 */
@Entity('cart_item')
export class CartItem extends BaseEntity {
  @Column({ type: 'integer', name: 'quantity', nullable: true })
  quantity: number;

  @ManyToOne(type => Learner)
  learner: Learner;

  @ManyToOne(type => Book)
  book: Book;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
