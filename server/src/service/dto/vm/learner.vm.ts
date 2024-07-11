/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { LearnerType } from '../../../domain/enumeration/learner-type';

/**
 * A LearnerDTO object.
 */
export class LearnerVM {
  @ApiProperty({ description: 'firstName field', required: true })
  firstName: string;

  @ApiProperty({ description: 'lastName field', required: false })
  lastName: string;

  @ApiProperty({ description: 'birthYear field', required: true })
  birthYear: number;

  @ApiProperty({ description: 'email field', required: true })
  email: string;

  @ApiProperty({ description: 'mobileNo field', required: false })
  mobileNo: string;

  // @ApiProperty({ description: 'nationalityCode field', required: false })
  // nationalityCode: string;

  // @ApiProperty({ description: 'city field', required: false })
  // city: string;

  // @ApiProperty({ description: 'address field', required: false })
  // address: string;

  @ApiProperty({ enum: LearnerType, description: 'learnerType enum field', required: true })
  learnerType: LearnerType;

  @ApiProperty({ description: 'studentId field', required: false })
  studentId: string;

  @ApiProperty({ description: 'password field', required: true })
  password: string;

  // @ApiProperty({ description: 'notes field', required: false })
  // notes: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
