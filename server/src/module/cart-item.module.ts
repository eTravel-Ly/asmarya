import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from '../web/rest/cart-item.controller';
import { CartItemRepository } from '../repository/cart-item.repository';
import { CartItemService } from '../service/cart-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([CartItemRepository])],
  controllers: [CartItemController],
  providers: [CartItemService],
  exports: [CartItemService],
})
export class CartItemModule {}
