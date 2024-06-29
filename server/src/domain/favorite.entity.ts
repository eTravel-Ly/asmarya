/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { Learner } from './learner.entity';
import { Book } from './book.entity';
import { Course } from './course.entity';

/**
 * A Favorite.
 */
@Entity('favorite')
export class Favorite extends BaseEntity {
  @ManyToOne(type => Learner)
  learner: Learner;

  @ManyToOne(type => Book)
  book: Book;

  @ManyToOne(type => Course)
  course: Course;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
