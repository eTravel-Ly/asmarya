import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../../../domain/enumeration/payment-type';

export class CheckoutVM {
  @ApiProperty({ enum: PaymentType, description: 'Payment method for the order' })
  paymentType: PaymentType;

  @ApiProperty({ description: 'Optional notes for the order', required: false })
  notes?: string;
}
