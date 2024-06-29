/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { BaseDTO } from './base.dto';

import { CourseDTO } from './course.dto';

/**
 * A CourseVideoDTO object.
 */
export class CourseVideoDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @ApiProperty({ description: 'details field', required: false })
  details: string;

  @ApiProperty({ description: 'file field', required: false })
  file: any;

  fileContentType: string;
  @ApiProperty({ description: 'fileUrl field', required: false })
  fileUrl: string;

  @ApiProperty({ description: 'durationInSeconds field', required: false })
  durationInSeconds: number;

  @ApiProperty({ type: () => CourseDTO, description: 'course relationship' })
  course: CourseDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
