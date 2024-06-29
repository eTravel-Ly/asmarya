import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AppSettingDTO } from '../service/dto/app-setting.dto';
import { AppSettingMapper } from '../service/mapper/app-setting.mapper';
import { AppSettingRepository } from '../repository/app-setting.repository';

const relationshipNames = [];

@Injectable()
export class AppSettingService {
  logger = new Logger('AppSettingService');

  constructor(@InjectRepository(AppSettingRepository) private appSettingRepository: AppSettingRepository) {}

  async findById(id: number): Promise<AppSettingDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.appSettingRepository.findOne(id, options);
    return AppSettingMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<AppSettingDTO>): Promise<AppSettingDTO | undefined> {
    const result = await this.appSettingRepository.findOne(options);
    return AppSettingMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<AppSettingDTO>): Promise<[AppSettingDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.appSettingRepository.findAndCount(options);
    const appSettingDTO: AppSettingDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(appSetting => appSettingDTO.push(AppSettingMapper.fromEntityToDTO(appSetting)));
      resultList[0] = appSettingDTO;
    }
    return resultList;
  }

  async save(appSettingDTO: AppSettingDTO, creator?: string): Promise<AppSettingDTO | undefined> {
    const entity = AppSettingMapper.fromDTOtoEntity(appSettingDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.appSettingRepository.save(entity);
    return AppSettingMapper.fromEntityToDTO(result);
  }

  async update(appSettingDTO: AppSettingDTO, updater?: string): Promise<AppSettingDTO | undefined> {
    const entity = AppSettingMapper.fromDTOtoEntity(appSettingDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.appSettingRepository.save(entity);
    return AppSettingMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.appSettingRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
