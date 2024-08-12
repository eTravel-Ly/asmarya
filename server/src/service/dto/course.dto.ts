/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Language } from '../../domain/enumeration/language';
import { BaseDTO } from './base.dto';

import { CategoryDTO } from './category.dto';
import { CourseVideoDTO } from './course-video.dto';
import { CommentDTO } from './comment.dto';

/**
 * A CourseDTO object.
 */
export class CourseDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @ApiProperty({ description: 'description field', required: false })
  description: string;

  @ApiProperty({ enum: Language, description: 'language enum field', required: false })
  language: Language;

  @ApiProperty({ description: 'coverImageFile field', required: false })
  coverImageFile: any;

  coverImageFileContentType: string;
  @ApiProperty({ description: 'coverImageUrl field', required: false })
  coverImageUrl: string;

  @ApiProperty({ description: 'price field', required: false })
  price: number;

  @ApiProperty({ description: 'studentsPrice field', required: false })
  studentsPrice: number;

  @ApiProperty({ description: 'keywords field', required: false })
  keywords: string;

  @ApiProperty({ description: 'overallRating field', required: false })
  overallRating: number;

  @ApiProperty({ description: 'isFavorite field', required: false })
  isFavorite: boolean;

  @ApiProperty({ description: 'progress step field', required: false })
  progressStep: number;

  @ApiProperty({ description: 'progress percentage field', required: false })
  progressPercentage: number;

  @ApiProperty({ type: () => CategoryDTO, isArray: true, description: 'categories relationship' })
  categories: CategoryDTO[];

  @ApiProperty({ type: () => CommentDTO, isArray: true, description: 'comments relationship' })
  comments: CommentDTO[];

  @ApiProperty({ type: () => CourseVideoDTO, isArray: true, description: 'videos relationship' })
  videos: CourseVideoDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
