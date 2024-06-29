/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Order } from './order.entity';
import { Book } from './book.entity';
import { Course } from './course.entity';

/**
 * A OrderItem.
 */
@Entity('order_item')
export class OrderItem extends BaseEntity {
  @Column({ type: 'float', name: 'total', nullable: true })
  total: number;

  @Column({ type: 'float', name: 'discount', nullable: true })
  discount: number;

  @ManyToOne(type => Order)
  order: Order;

  @ManyToOne(type => Book)
  book: Book;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
