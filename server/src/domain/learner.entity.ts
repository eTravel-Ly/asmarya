/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { LearnerType } from './enumeration/learner-type';

import { User } from './user.entity';

/**
 * A Learner.
 */
@Entity('learner')
export class Learner extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ type: 'integer', name: 'birth_year', nullable: true })
  birthYear: number;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'mobile_no', nullable: true })
  mobileNo: string;

  @Column({ name: 'google_id', nullable: true })
  googleId: string;

  @Column({ name: 'facebook_id', nullable: true })
  facebookId: string;

  @Column({ name: 'apple_id', nullable: true })
  appleId: string;

  @Column({ type: 'boolean', name: 'is_banned', nullable: true })
  isBanned: boolean;

  @Column({ type: 'boolean', name: 'verified_by_email', nullable: true })
  verifiedByEmail: boolean;

  @Column({ type: 'boolean', name: 'verified_by_mobile_no', nullable: true })
  verifiedByMobileNo: boolean;

  @Column({ type: 'longblob', name: 'image_file', nullable: true })
  imageFile: any;

  @Column({ name: 'image_file_content_type', nullable: true })
  imageFileContentType: string;
  @Column({ name: 'image_file_url', nullable: true })
  imageFileUrl: string;

  @Column({ name: 'nationality_code', nullable: true })
  nationalityCode: string;

  @Column({ name: 'city', nullable: true })
  city: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ type: 'simple-enum', name: 'learner_type', enum: LearnerType })
  learnerType: LearnerType;

  @Column({ name: 'student_id', nullable: true })
  studentId: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
