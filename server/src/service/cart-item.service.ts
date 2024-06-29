import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CartItemDTO } from '../service/dto/cart-item.dto';
import { CartItemMapper } from '../service/mapper/cart-item.mapper';
import { CartItemRepository } from '../repository/cart-item.repository';

const relationshipNames = [];
relationshipNames.push('learner');
relationshipNames.push('book');
relationshipNames.push('course');

@Injectable()
export class CartItemService {
  logger = new Logger('CartItemService');

  constructor(@InjectRepository(CartItemRepository) private cartItemRepository: CartItemRepository) {}

  async findById(id: number): Promise<CartItemDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.cartItemRepository.findOne(id, options);
    return CartItemMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<CartItemDTO>): Promise<CartItemDTO | undefined> {
    const result = await this.cartItemRepository.findOne(options);
    return CartItemMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CartItemDTO>): Promise<[CartItemDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.cartItemRepository.findAndCount(options);
    const cartItemDTO: CartItemDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(cartItem => cartItemDTO.push(CartItemMapper.fromEntityToDTO(cartItem)));
      resultList[0] = cartItemDTO;
    }
    return resultList;
  }

  async save(cartItemDTO: CartItemDTO, creator?: string): Promise<CartItemDTO | undefined> {
    const entity = CartItemMapper.fromDTOtoEntity(cartItemDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.cartItemRepository.save(entity);
    return CartItemMapper.fromEntityToDTO(result);
  }

  async update(cartItemDTO: CartItemDTO, updater?: string): Promise<CartItemDTO | undefined> {
    const entity = CartItemMapper.fromDTOtoEntity(cartItemDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.cartItemRepository.save(entity);
    return CartItemMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.cartItemRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
