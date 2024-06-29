/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Category } from './category.entity';
import { Language } from './enumeration/language';

/**
 * A Course.
 */
@Entity('course')
export class Course extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ type: 'simple-enum', name: 'language', enum: Language })
  language: Language;

  @Column({ type: 'blob', name: 'cover_image_file', nullable: true })
  coverImageFile: any;

  @Column({ name: 'cover_image_file_content_type', nullable: true })
  coverImageFileContentType: string;
  @Column({ name: 'cover_image_url', nullable: true })
  coverImageUrl: string;

  @Column({ type: 'float', name: 'price', nullable: true })
  price: number;

  @Column({ type: 'float', name: 'students_price', nullable: true })
  studentsPrice: number;

  @Column({ name: 'keywords', nullable: true })
  keywords: string;

  @ManyToMany(type => Category)
  @JoinTable({
    name: 'rel_course__categories',
    joinColumn: { name: 'course_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'categories_id', referencedColumnName: 'id' },
  })
  categories: Category[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
