/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { EventType } from './enumeration/event-type';
import { ParticipationType } from './enumeration/participation-type';

/**
 * A Event.
 */
@Entity('event')
export class Event extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'organizer', nullable: true })
  organizer: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'simple-enum', name: 'event_type', enum: EventType })
  eventType: EventType;

  @Column({ type: 'simple-enum', name: 'participation_type', enum: ParticipationType })
  participationType: ParticipationType;

  @Column({ type: 'date', name: 'event_start_date', nullable: true })
  eventStartDate: any;

  @Column({ type: 'date', name: 'event_end_date', nullable: true })
  eventEndDate: any;

  @Column({ type: 'date', name: 'apply_start_date', nullable: true })
  applyStartDate: any;

  @Column({ type: 'date', name: 'apply_end_date', nullable: true })
  applyEndDate: any;

  @Column({ type: 'date', name: 'abstract_apply_end_date', nullable: true })
  abstractApplyEndDate: any;

  @Column({ type: 'date', name: 'papers_replay_date', nullable: true })
  papersReplayDate: any;

  @Column({ type: 'date', name: 'enrollment_end_date', nullable: true })
  enrollmentEndDate: any;

  @Column({ name: 'contact_mobile', nullable: true })
  contactMobile: string;

  @Column({ name: 'contact_whats_app', nullable: true })
  contactWhatsApp: string;

  @Column({ name: 'contact_website', nullable: true })
  contactWebsite: string;

  @Column({ name: 'contact_email', nullable: true })
  contactEmail: string;

  @Column({ name: 'conditions', nullable: true })
  conditions: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  @Column({ type: 'blob', name: 'cover_image_file', nullable: true })
  coverImageFile: any;

  @Column({ name: 'cover_image_file_content_type', nullable: true })
  coverImageFileContentType: string;
  @Column({ name: 'cover_image_url', nullable: true })
  coverImageUrl: string;

  @Column({ type: 'boolean', name: 'is_active', nullable: true })
  isActive: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
