/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseFilter } from '../../../domain/base/filter.entity';

/**
 * A EventSubscriptionDTO object.
 */
export class EventSubscriptionFilter extends BaseFilter {
  @ApiProperty({ description: 'Event ID', required: false })
  'event.id'?: number;

  @ApiProperty({ description: 'title field', required: false })
  title_contains?: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
