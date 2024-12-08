/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { UserDTO } from './user.dto';

/**
 * A SheikhDTO object.
 */
export class SheikhDTO extends BaseDTO {
  @ApiProperty({ description: 'firstName field', required: false })
  firstName: string;

  @ApiProperty({ description: 'lastName field', required: false })
  lastName: string;

  @ApiProperty({ description: 'birthDate field', required: false })
  birthDate: any;

  @ApiProperty({ description: 'phoneNumber field', required: false })
  phoneNumber: string;

  @ApiProperty({ description: 'email field', required: false })
  email: string;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  @ApiProperty({ type: () => UserDTO, description: 'user relationship' })
  user: UserDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
