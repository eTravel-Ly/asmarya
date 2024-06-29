/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { BookDTO } from './book.dto';
import { CourseDTO } from './course.dto';

/**
 * A CategoryDTO object.
 */
export class CategoryDTO extends BaseDTO {
  @ApiProperty({ description: 'nameAr field', required: false })
  nameAr: string;

  @ApiProperty({ description: 'nameEn field', required: false })
  nameEn: string;

  @ApiProperty({ description: 'menuOrder field', required: false })
  menuOrder: number;

  @ApiProperty({ description: 'imageFileUrl field', required: false })
  imageFileUrl: string;

  @ApiProperty({ description: 'imageFile field', required: false })
  imageFile: any;

  imageFileContentType: string;
  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  @ApiProperty({ description: 'isActive field', required: false })
  isActive: boolean;

  @ApiProperty({ type: () => BookDTO, isArray: true, description: 'books relationship' })
  books: BookDTO[];

  @ApiProperty({ type: () => CourseDTO, isArray: true, description: 'courses relationship' })
  courses: CourseDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
