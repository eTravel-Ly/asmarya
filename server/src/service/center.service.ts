import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CenterDTO } from '../service/dto/center.dto';
import { CenterMapper } from '../service/mapper/center.mapper';
import { CenterRepository } from '../repository/center.repository';

const relationshipNames = [];
relationshipNames.push('sheikhs');

@Injectable()
export class CenterService {
  logger = new Logger('CenterService');

  constructor(@InjectRepository(CenterRepository) private centerRepository: CenterRepository) {}

  async findById(id: number): Promise<CenterDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.centerRepository.findOne(id, options);
    return CenterMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<CenterDTO>): Promise<CenterDTO | undefined> {
    const result = await this.centerRepository.findOne(options);
    return CenterMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CenterDTO>): Promise<[CenterDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.centerRepository.findAndCount(options);
    const centerDTO: CenterDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(center => centerDTO.push(CenterMapper.fromEntityToDTO(center)));
      resultList[0] = centerDTO;
    }
    return resultList;
  }

  async save(centerDTO: CenterDTO, creator?: string): Promise<CenterDTO | undefined> {
    const entity = CenterMapper.fromDTOtoEntity(centerDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.centerRepository.save(entity);
    return CenterMapper.fromEntityToDTO(result);
  }

  async update(centerDTO: CenterDTO, updater?: string): Promise<CenterDTO | undefined> {
    const entity = CenterMapper.fromDTOtoEntity(centerDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.centerRepository.save(entity);
    return CenterMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.centerRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
