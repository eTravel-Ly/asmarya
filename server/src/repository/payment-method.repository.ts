import { EntityRepository, Repository } from 'typeorm';
import { PaymentMethod } from '../domain/payment-method.entity';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends Repository<PaymentMethod> {}
