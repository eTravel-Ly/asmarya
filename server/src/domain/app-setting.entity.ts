/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A AppSetting.
 */
@Entity('app_setting')
export class AppSetting extends BaseEntity {
  @Column({ name: 'name', nullable: true })
  name: string;

  @Column({ name: 'jhi_key', nullable: true })
  key: string;

  @Column({ name: 'type', nullable: true })
  type: string;

  @Column({ name: 'value', nullable: true })
  value: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
