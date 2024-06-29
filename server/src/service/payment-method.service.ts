import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PaymentMethodDTO } from '../service/dto/payment-method.dto';
import { PaymentMethodMapper } from '../service/mapper/payment-method.mapper';
import { PaymentMethodRepository } from '../repository/payment-method.repository';

const relationshipNames = [];

@Injectable()
export class PaymentMethodService {
  logger = new Logger('PaymentMethodService');

  constructor(@InjectRepository(PaymentMethodRepository) private paymentMethodRepository: PaymentMethodRepository) {}

  async findById(id: number): Promise<PaymentMethodDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.paymentMethodRepository.findOne(id, options);
    return PaymentMethodMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<PaymentMethodDTO>): Promise<PaymentMethodDTO | undefined> {
    const result = await this.paymentMethodRepository.findOne(options);
    return PaymentMethodMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<PaymentMethodDTO>): Promise<[PaymentMethodDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.paymentMethodRepository.findAndCount(options);
    const paymentMethodDTO: PaymentMethodDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(paymentMethod => paymentMethodDTO.push(PaymentMethodMapper.fromEntityToDTO(paymentMethod)));
      resultList[0] = paymentMethodDTO;
    }
    return resultList;
  }

  async save(paymentMethodDTO: PaymentMethodDTO, creator?: string): Promise<PaymentMethodDTO | undefined> {
    const entity = PaymentMethodMapper.fromDTOtoEntity(paymentMethodDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.paymentMethodRepository.save(entity);
    return PaymentMethodMapper.fromEntityToDTO(result);
  }

  async update(paymentMethodDTO: PaymentMethodDTO, updater?: string): Promise<PaymentMethodDTO | undefined> {
    const entity = PaymentMethodMapper.fromDTOtoEntity(paymentMethodDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.paymentMethodRepository.save(entity);
    return PaymentMethodMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.paymentMethodRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
