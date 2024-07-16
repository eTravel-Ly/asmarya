/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { PaymentType } from './enumeration/payment-type';

/**
 * A PaymentMethod.
 */
@Entity('payment_method')
export class PaymentMethod extends BaseEntity {
  @Column({ name: 'name_ar', nullable: true })
  nameAr: string;

  @Column({ name: 'name_en', nullable: true })
  nameEn: string;

  @Column({ type: 'integer', name: 'menu_order', nullable: true })
  menuOrder: number;

  @Column({ name: 'image_file_url', nullable: true })
  imageFileUrl: string;

  @Column({ type: 'longblob', name: 'image_file', nullable: true })
  imageFile: any;

  @Column({ name: 'image_file_content_type', nullable: true })
  imageFileContentType: string;
  @Column({ name: 'details', nullable: true })
  details: string;

  @Column({ type: 'double', name: 'fee_percentage', nullable: true })
  feePercentage: number;

  @Column({ type: 'simple-enum', name: 'payment_type', enum: PaymentType })
  paymentType: PaymentType;

  @Column({ type: 'boolean', name: 'is_active', nullable: true })
  isActive: boolean;

  @Column({ name: 'notes', nullable: true })
  notes: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
