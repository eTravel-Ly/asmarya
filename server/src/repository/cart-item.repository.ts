import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from '../domain/cart-item.entity';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {}
