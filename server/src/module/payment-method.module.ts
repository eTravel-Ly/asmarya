import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethodController } from '../web/rest/payment-method.controller';
import { PaymentMethodRepository } from '../repository/payment-method.repository';
import { PaymentMethodService } from '../service/payment-method.service';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMethodRepository])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
  exports: [PaymentMethodService],
})
export class PaymentMethodModule {}
