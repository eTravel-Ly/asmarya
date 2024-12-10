/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Sheikh } from './sheikh.entity';

/**
 * A Center.
 */
@Entity('center')
export class Center extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'address', nullable: true })
  address: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ name: 'email', nullable: true })
  email: string;

  @Column({ name: 'manager_name', nullable: true })
  managerName: string;

  @Column({ name: 'working_hours', nullable: true })
  workingHours: string;

  @Column({ type: 'integer', name: 'number_of_students', nullable: true })
  numberOfStudents: number;

  @Column({ type: 'integer', name: 'number_of_teachers', nullable: true })
  numberOfTeachers: number;

  @Column({ type: 'date', name: 'establishment_date', nullable: true })
  establishmentDate: any;

  @Column({ name: 'programs_offered', nullable: true })
  programsOffered: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @ManyToMany(type => Sheikh)
  @JoinTable({
    name: 'rel_center__sheikhs',
    joinColumn: { name: 'center_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'sheikhs_id', referencedColumnName: 'id' },
  })
  sheikhs: Sheikh[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
