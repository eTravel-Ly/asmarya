/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Notification.
 */
@Entity('notification')
export class Notification extends BaseEntity {
  @Column({ name: 'title', nullable: true })
  title: string;

  @Column({ name: 'details', nullable: true })
  details: string;

  @Column({ type: 'boolean', name: 'is_read', nullable: true })
  isRead: boolean;

  @Column({ type: 'integer', name: 'user_id', nullable: true })
  userId: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
