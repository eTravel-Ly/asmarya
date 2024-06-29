/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A ActivationDTO object.
 */
export class ActivationDTO extends BaseDTO {
  @ApiProperty({ description: 'mobileNo field', required: false })
  mobileNo: string;

  @ApiProperty({ description: 'email field', required: false })
  email: string;

  @ApiProperty({ description: 'code field', required: false })
  code: string;

  @ApiProperty({ description: 'sentOn field', required: false })
  sentOn: any;

  @ApiProperty({ description: 'validUntil field', required: false })
  validUntil: any;

  @ApiProperty({ description: 'isUsed field', required: false })
  isUsed: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
