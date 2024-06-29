/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A Slider.
 */
@Entity('slider')
export class Slider extends BaseEntity {
  @Column({ name: 'details_ar', nullable: true })
  detailsAr: string;

  @Column({ name: 'details_en', nullable: true })
  detailsEn: string;

  @Column({ type: 'integer', name: 'menu_order', nullable: true })
  menuOrder: number;

  @Column({ name: 'image_file_url', nullable: true })
  imageFileUrl: string;

  @Column({ type: 'blob', name: 'image_file', nullable: true })
  imageFile: any;

  @Column({ name: 'image_file_content_type', nullable: true })
  imageFileContentType: string;
  @Column({ name: 'link', nullable: true })
  link: string;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
