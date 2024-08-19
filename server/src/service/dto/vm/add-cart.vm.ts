import { ApiProperty } from '@nestjs/swagger';
import { EntityType } from '../../../domain/enumeration/entity-type';

export class AddCartVM {
  @ApiProperty({ enum: EntityType, description: 'Type of item (BOOK or COURSE)' })
  type: EntityType;

  @ApiProperty({ description: 'ID of the item to add to cart' })
  id: number;

  @ApiProperty({ description: 'Quantity of the item to add to cart', required: false })
  quantity?: number;
}
