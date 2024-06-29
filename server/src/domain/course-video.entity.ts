/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Course } from './course.entity';

/**
 * A CourseVideo.
 */
@Entity('course_video')
export class CourseVideo extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'details', nullable: true })
  details: string;

  @Column({ type: 'blob', name: 'file', nullable: true })
  file: any;

  @Column({ name: 'file_content_type', nullable: true })
  fileContentType: string;
  @Column({ name: 'file_url', nullable: true })
  fileUrl: string;

  @Column({ type: 'integer', name: 'duration_in_seconds', nullable: true })
  durationInSeconds: number;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
