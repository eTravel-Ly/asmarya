/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A AppSettingDTO object.
 */
export class AppSettingDTO extends BaseDTO {
  @ApiProperty({ description: 'name field', required: false })
  name: string;

  @ApiProperty({ description: 'key field', required: false })
  key: string;

  @ApiProperty({ description: 'type field', required: false })
  type: string;

  @ApiProperty({ description: 'value field', required: false })
  value: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
