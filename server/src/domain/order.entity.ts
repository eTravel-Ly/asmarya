/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Learner } from './learner.entity';
import { PaymentType } from './enumeration/payment-type';
import { OrderStatus } from './enumeration/order-status';

/**
 * A Order.
 */
@Entity('order')
export class Order extends BaseEntity {
  @Column({ name: 'order_no', nullable: true })
  orderNo: string;

  @Column({ type: 'float', name: 'total', nullable: true })
  total: number;

  @Column({ type: 'float', name: 'discount', nullable: true })
  discount: number;

  @Column({ type: 'simple-enum', name: 'payment_type', enum: PaymentType })
  paymentType: PaymentType;

  @Column({ type: 'simple-enum', name: 'order_status', enum: OrderStatus })
  orderStatus: OrderStatus;

  @Column({ type: 'timestamp', name: 'payed_at', nullable: true })
  payedAt: any;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  @ManyToOne(type => Learner)
  learner: Learner;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
