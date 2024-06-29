import dayjs from 'dayjs';
import { ILearner } from 'app/shared/model/learner.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  orderNo?: string | null;
  total?: number | null;
  discount?: number | null;
  paymentType?: keyof typeof PaymentType | null;
  orderStatus?: keyof typeof OrderStatus | null;
  payedAt?: dayjs.Dayjs | null;
  notes?: string | null;
  learner?: ILearner | null;
}

export const defaultValue: Readonly<IOrder> = {};
