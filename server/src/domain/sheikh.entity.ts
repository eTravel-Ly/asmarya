/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, JoinColumn, OneToOne, ManyToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Center } from './center.entity';

import { User } from './user.entity';

/**
 * A Sheikh.
 */
@Entity('sheikh')
export class Sheikh extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ type: 'date', name: 'birth_date', nullable: true })
  birthDate: any;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;

  @ManyToMany(type => Center)
  centers: Center[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
