/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A NotificationDTO object.
 */
export class NotificationDTO extends BaseDTO {
  @ApiProperty({ description: 'title field', required: false })
  title: string;

  @ApiProperty({ description: 'details field', required: false })
  details: string;

  @ApiProperty({ description: 'isRead field', required: false })
  isRead: boolean;

  @ApiProperty({ description: 'userId field', required: false })
  userId: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
