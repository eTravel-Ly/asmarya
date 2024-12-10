/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { SheikhDTO } from './sheikh.dto';

/**
 * A CenterDTO object.
 */
export class CenterDTO extends BaseDTO {
  @ApiProperty({ description: 'name field', required: false })
  name: string;

  @ApiProperty({ description: 'address field', required: false })
  address: string;

  @ApiProperty({ description: 'phoneNumber field', required: false })
  phoneNumber: string;

  @ApiProperty({ description: 'email field', required: false })
  email: string;

  @ApiProperty({ description: 'managerName field', required: false })
  managerName: string;

  @ApiProperty({ description: 'workingHours field', required: false })
  workingHours: string;

  @ApiProperty({ description: 'numberOfStudents field', required: false })
  numberOfStudents: number;

  @ApiProperty({ description: 'numberOfTeachers field', required: false })
  numberOfTeachers: number;

  @ApiProperty({ description: 'establishmentDate field', required: false })
  establishmentDate: any;

  @ApiProperty({ description: 'programsOffered field', required: false })
  programsOffered: string;

  @ApiProperty({ description: 'description field', required: false })
  description: string;

  @ApiProperty({ type: () => SheikhDTO, isArray: true, description: 'sheikhs relationship' })
  sheikhs: SheikhDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
