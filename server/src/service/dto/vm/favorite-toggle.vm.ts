/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../../../domain/enumeration/entity-type';

/**
 * A LearnerDTO object.
 */
export class FavoriteToggleVM {
  @ApiProperty({ enum: EntityType, description: 'type enum field', required: true })
  type: EntityType;

  @ApiProperty({ description: 'id field', required: true })
  id: number;
}
