/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Activation.
 */
@Entity('activation')
export class Activation extends BaseEntity {
  @Column({ name: 'mobile_no', nullable: true })
  mobileNo: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'code', nullable: true })
  code: string;

  @Column({ type: 'timestamp', name: 'sent_on', nullable: true })
  sentOn: any;

  @Column({ type: 'timestamp', name: 'valid_until', nullable: true })
  validUntil: any;

  @Column({ type: 'boolean', name: 'is_used', nullable: true })
  isUsed: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
