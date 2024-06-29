/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../../domain/enumeration/payment-type';
import { OrderStatus } from '../../domain/enumeration/order-status';
import { BaseDTO } from './base.dto';

import { LearnerDTO } from './learner.dto';

/**
 * A OrderDTO object.
 */
export class OrderDTO extends BaseDTO {
  @ApiProperty({ description: 'orderNo field', required: false })
  orderNo: string;

  @ApiProperty({ description: 'total field', required: false })
  total: number;

  @ApiProperty({ description: 'discount field', required: false })
  discount: number;

  @ApiProperty({ enum: PaymentType, description: 'paymentType enum field', required: false })
  paymentType: PaymentType;

  @ApiProperty({ enum: OrderStatus, description: 'orderStatus enum field', required: false })
  orderStatus: OrderStatus;

  @ApiProperty({ description: 'payedAt field', required: false })
  payedAt: any;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  @ApiProperty({ type: () => LearnerDTO, description: 'learner relationship' })
  learner: LearnerDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
