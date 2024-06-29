/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { LearnerType } from '../../domain/enumeration/learner-type';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A LearnerDTO object.
 */
export class LearnerDTO extends BaseDTO {
  @ApiProperty({ description: 'firstName field', required: false })
  firstName: string;

  @ApiProperty({ description: 'lastName field', required: false })
  lastName: string;

  @ApiProperty({ description: 'birthYear field', required: false })
  birthYear: number;

  @ApiProperty({ description: 'email field', required: false })
  email: string;

  @ApiProperty({ description: 'mobileNo field', required: false })
  mobileNo: string;

  @ApiProperty({ description: 'googleId field', required: false })
  googleId: string;

  @ApiProperty({ description: 'facebookId field', required: false })
  facebookId: string;

  @ApiProperty({ description: 'appleId field', required: false })
  appleId: string;

  @ApiProperty({ description: 'isBanned field', required: false })
  isBanned: boolean;

  @ApiProperty({ description: 'verifiedByEmail field', required: false })
  verifiedByEmail: boolean;

  @ApiProperty({ description: 'verifiedByMobileNo field', required: false })
  verifiedByMobileNo: boolean;

  @ApiProperty({ description: 'imageFile field', required: false })
  imageFile: any;

  imageFileContentType: string;
  @ApiProperty({ description: 'imageFileUrl field', required: false })
  imageFileUrl: string;

  @ApiProperty({ description: 'nationalityCode field', required: false })
  nationalityCode: string;

  @ApiProperty({ description: 'city field', required: false })
  city: string;

  @ApiProperty({ description: 'address field', required: false })
  address: string;

  @ApiProperty({ enum: LearnerType, description: 'learnerType enum field', required: false })
  learnerType: LearnerType;

  @ApiProperty({ description: 'studentId field', required: false })
  studentId: string;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user: UserDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
