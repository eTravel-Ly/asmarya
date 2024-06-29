import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';

export interface IPaymentMethod {
  id?: number;
  nameAr?: string | null;
  nameEn?: string | null;
  menuOrder?: number | null;
  imageFileUrl?: string | null;
  imageFileContentType?: string | null;
  imageFile?: string | null;
  details?: string | null;
  feePercentage?: number | null;
  paymentType?: keyof typeof PaymentType | null;
  isActive?: boolean | null;
  notes?: string | null;
}

export const defaultValue: Readonly<IPaymentMethod> = {
  isActive: false,
};
