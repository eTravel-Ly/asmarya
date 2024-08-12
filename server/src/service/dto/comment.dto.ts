/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { LearnerDTO } from './learner.dto';
import { BookDTO } from './book.dto';
import { CourseDTO } from './course.dto';

/**
 * A CommentDTO object.
 */
export class CommentDTO extends BaseDTO {
  @ApiProperty({ description: 'details field', required: false })
  details: string;

  @ApiProperty({ description: 'rating field', required: false })
  rating: number;

  @ApiProperty({ description: 'likesCount field', required: false })
  likesCount: number;

  @ApiProperty({ description: 'dislikesCount field', required: false })
  dislikesCount: number;

  @ApiProperty({ type: () => LearnerDTO, description: 'learner relationship' })
  learner: LearnerDTO;

  @ApiProperty({ type: () => BookDTO, description: 'book relationship' })
  book: BookDTO;

  @ApiProperty({ type: () => CourseDTO, description: 'course relationship' })
  course: CourseDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
