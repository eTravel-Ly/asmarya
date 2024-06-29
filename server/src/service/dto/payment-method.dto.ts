/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from '../../domain/enumeration/payment-type';
import { BaseDTO } from './base.dto';

/**
 * A PaymentMethodDTO object.
 */
export class PaymentMethodDTO extends BaseDTO {
  @ApiProperty({ description: 'nameAr field', required: false })
  nameAr: string;

  @ApiProperty({ description: 'nameEn field', required: false })
  nameEn: string;

  @ApiProperty({ description: 'menuOrder field', required: false })
  menuOrder: number;

  @ApiProperty({ description: 'imageFileUrl field', required: false })
  imageFileUrl: string;

  @ApiProperty({ description: 'imageFile field', required: false })
  imageFile: any;

  imageFileContentType: string;
  @ApiProperty({ description: 'details field', required: false })
  details: string;

  @ApiProperty({ description: 'feePercentage field', required: false })
  feePercentage: number;

  @ApiProperty({ enum: PaymentType, description: 'paymentType enum field', required: false })
  paymentType: PaymentType;

  @ApiProperty({ description: 'isActive field', required: false })
  isActive: boolean;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
