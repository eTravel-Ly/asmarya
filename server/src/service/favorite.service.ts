import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { FavoriteDTO } from '../service/dto/favorite.dto';
import { FavoriteMapper } from '../service/mapper/favorite.mapper';
import { FavoriteRepository } from '../repository/favorite.repository';

const relationshipNames = [];
relationshipNames.push('learner');
relationshipNames.push('book');
relationshipNames.push('course');

@Injectable()
export class FavoriteService {
  logger = new Logger('FavoriteService');

  constructor(@InjectRepository(FavoriteRepository) private favoriteRepository: FavoriteRepository) {}

  async findById(id: number): Promise<FavoriteDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.favoriteRepository.findOne(id, options);
    return FavoriteMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<FavoriteDTO>): Promise<FavoriteDTO | undefined> {
    const result = await this.favoriteRepository.findOne(options);
    return FavoriteMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<FavoriteDTO>): Promise<[FavoriteDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.favoriteRepository.findAndCount(options);
    const favoriteDTO: FavoriteDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(favorite => favoriteDTO.push(FavoriteMapper.fromEntityToDTO(favorite)));
      resultList[0] = favoriteDTO;
    }
    return resultList;
  }

  async save(favoriteDTO: FavoriteDTO, creator?: string): Promise<FavoriteDTO | undefined> {
    const entity = FavoriteMapper.fromDTOtoEntity(favoriteDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.favoriteRepository.save(entity);
    return FavoriteMapper.fromEntityToDTO(result);
  }

  async update(favoriteDTO: FavoriteDTO, updater?: string): Promise<FavoriteDTO | undefined> {
    const entity = FavoriteMapper.fromDTOtoEntity(favoriteDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.favoriteRepository.save(entity);
    return FavoriteMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.favoriteRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
