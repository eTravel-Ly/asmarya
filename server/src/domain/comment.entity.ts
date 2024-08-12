/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Learner } from './learner.entity';
import { Book } from './book.entity';
import { Course } from './course.entity';

/**
 * A Comment.
 */
@Entity('comment')
export class Comment extends BaseEntity {
  @Column({ name: 'details', nullable: true })
  details: string;

  @Column({ type: 'integer', name: 'rating', nullable: true })
  rating: number;

  @Column({ type: 'integer', name: 'likes_count', nullable: true })
  likesCount: number;

  @Column({ type: 'integer', name: 'dislikes_count', nullable: true })
  dislikesCount: number;

  @ManyToOne(type => Learner)
  learner: Learner;

  @ManyToOne(type => Book)
  book: Book;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
