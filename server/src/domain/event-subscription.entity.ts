/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Event } from './event.entity';
import { Learner } from './learner.entity';
import { Gender } from './enumeration/gender';
import { SubscriptionStatus } from './enumeration/subscription-status';

/**
 * A EventSubscription.
 */
@Entity('event_subscription')
export class EventSubscription extends BaseEntity {
  @Column({ name: 'full_name', nullable: true })
  fullName: string;

  @Column({ type: 'simple-enum', name: 'gender', enum: Gender })
  gender: Gender;

  @Column({ name: 'birth_date', nullable: true })
  birthDate: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'mobile_no', nullable: true })
  mobileNo: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'nationality_code', nullable: true })
  nationalityCode: string;

  @Column({ type: 'simple-enum', name: 'subscription_status', enum: SubscriptionStatus })
  subscriptionStatus: SubscriptionStatus;

  @Column({ name: 'results', nullable: true })
  results: string;

  @Column({ name: 'subscriber_notes', nullable: true })
  subscriberNotes: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  @Column({ name: 'subscription_date', nullable: true })
  subscriptionDate: string;

  @Column({ name: 'attachment_url', nullable: true })
  attachmentUrl: string;

  @Column({ type: 'blob', name: 'attachment_file', nullable: true })
  attachmentFile: any;

  @Column({ name: 'attachment_file_content_type', nullable: true })
  attachmentFileContentType: string;

  @ManyToOne(type => Event)
  event: Event;

  @ManyToOne(type => Learner)
  learner: Learner;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
