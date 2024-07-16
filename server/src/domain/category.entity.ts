/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Book } from './book.entity';
import { Course } from './course.entity';

/**
 * A Category.
 */
@Entity('category')
export class Category extends BaseEntity {
  @Column({ name: 'name_ar', nullable: true })
  nameAr: string;

  @Column({ name: 'name_en', nullable: true })
  nameEn: string;

  @Column({ type: 'integer', name: 'menu_order', nullable: true })
  menuOrder: number;

  @Column({ name: 'image_file_url', nullable: true })
  imageFileUrl: string;

  @Column({ type: 'longblob', name: 'image_file', nullable: true })
  imageFile: any;

  @Column({ name: 'image_file_content_type', nullable: true })
  imageFileContentType: string;
  @Column({ name: 'notes', nullable: true })
  notes: string;

  @Column({ type: 'boolean', name: 'is_active', nullable: true })
  isActive: boolean;

  @ManyToMany(type => Book)
  books: Book[];

  @ManyToMany(type => Course)
  courses: Course[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
