import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SheikhDTO } from '../service/dto/sheikh.dto';
import { SheikhMapper } from '../service/mapper/sheikh.mapper';
import { SheikhRepository } from '../repository/sheikh.repository';

const relationshipNames = [];

@Injectable()
export class SheikhService {
  logger = new Logger('SheikhService');

  constructor(@InjectRepository(SheikhRepository) private sheikhRepository: SheikhRepository) {}

  async findById(id: number): Promise<SheikhDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.sheikhRepository.findOne(id, options);
    return SheikhMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<SheikhDTO>): Promise<SheikhDTO | undefined> {
    const result = await this.sheikhRepository.findOne(options);
    return SheikhMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<SheikhDTO>): Promise<[SheikhDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.sheikhRepository.findAndCount(options);
    const sheikhDTO: SheikhDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(sheikh => sheikhDTO.push(SheikhMapper.fromEntityToDTO(sheikh)));
      resultList[0] = sheikhDTO;
    }
    return resultList;
  }

  async save(sheikhDTO: SheikhDTO, creator?: string): Promise<SheikhDTO | undefined> {
    const entity = SheikhMapper.fromDTOtoEntity(sheikhDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.sheikhRepository.save(entity);
    return SheikhMapper.fromEntityToDTO(result);
  }

  async update(sheikhDTO: SheikhDTO, updater?: string): Promise<SheikhDTO | undefined> {
    const entity = SheikhMapper.fromDTOtoEntity(sheikhDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.sheikhRepository.save(entity);
    return SheikhMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.sheikhRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
