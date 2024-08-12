/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne } from 'typeorm';
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

  @Column({ type: 'integer', name: 'progress_step', nullable: true })
  progressStep: number;

  @Column({ type: 'integer', name: 'progress_percentage', nullable: true })
  progressPercentage: number;

  @ManyToOne(type => Order)
  order: Order;

  @ManyToOne(type => Book)
  book: Book;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
