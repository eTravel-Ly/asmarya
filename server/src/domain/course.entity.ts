/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Category } from './category.entity';
import { Language } from './enumeration/language';
import { CourseVideo } from './course-video.entity';
import { Comment } from './comment.entity';

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

  @Column({ type: 'longblob', name: 'cover_image_file', nullable: true })
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

  @OneToMany(type => Comment, comment => comment.course)
  comments: Comment[];

  @OneToMany(type => CourseVideo, video => video.course)
  videos: CourseVideo[];

  overallRating: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
