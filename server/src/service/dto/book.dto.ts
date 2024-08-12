/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { BookGenre } from '../../domain/enumeration/book-genre';
import { Language } from '../../domain/enumeration/language';
import { BookAvailability } from '../../domain/enumeration/book-availability';
import { CategoryDTO } from './category.dto';
import { BaseDTO } from './base.dto';
import { CommentDTO } from './comment.dto';

/**
 * A BookDTO object.
 */
export class BookDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'author field' })
  author: string;

  @ApiProperty({ description: 'publicationDate field', required: false })
  publicationDate: any;

  @ApiProperty({ description: 'isbn field', required: false })
  isbn: string;

  @ApiProperty({ description: 'description field', required: false })
  description: string;

  @ApiProperty({ enum: BookGenre, description: 'genre enum field', required: false })
  genre: BookGenre;

  @ApiProperty({ description: 'publisher field', required: false })
  publisher: string;

  @ApiProperty({ description: 'pageCount field', required: false })
  pageCount: number;

  @ApiProperty({ enum: Language, description: 'language enum field', required: false })
  language: Language;

  @ApiProperty({ description: 'coverImageFile field', required: false })
  coverImageFile: any;

  coverImageFileContentType: string;
  @ApiProperty({ description: 'coverImageUrl field', required: false })
  coverImageUrl: string;

  @ApiProperty({ description: 'bookFile field', required: false })
  bookFile: any;

  bookFileContentType: string;
  @ApiProperty({ description: 'bookUrl field', required: false })
  bookUrl: string;

  @ApiProperty({ description: 'price field', required: false })
  price: number;

  @ApiProperty({ description: 'studentsPrice field', required: false })
  studentsPrice: number;

  @ApiProperty({ description: 'numberOfBooksAvailable field', required: false })
  numberOfBooksAvailable: number;

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

  @ApiProperty({ enum: BookAvailability, description: 'bookAvailability enum field', required: false })
  bookAvailability: BookAvailability;

  @ApiProperty({ type: () => CategoryDTO, isArray: true, description: 'categories relationship' })
  categories: CategoryDTO[];

  @ApiProperty({ type: () => CommentDTO, isArray: true, description: 'comments relationship' })
  comments: CommentDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
