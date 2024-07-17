import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { SliderDTO } from '../service/dto/slider.dto';
import { SliderMapper } from '../service/mapper/slider.mapper';
import { SliderRepository } from '../repository/slider.repository';
import { Helpers } from './utils/helpers';

const relationshipNames = [];

@Injectable()
export class SliderService {
  logger = new Logger('SliderService');

  constructor(@InjectRepository(SliderRepository) private sliderRepository: SliderRepository) {}

  async findById(id: number): Promise<SliderDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.sliderRepository.findOne(id, options);
    return SliderMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<SliderDTO>): Promise<SliderDTO | undefined> {
    const result = await this.sliderRepository.findOne(options);
    return SliderMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<SliderDTO>): Promise<[SliderDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.sliderRepository.findAndCount(options);
    const sliderDTO: SliderDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(slider => sliderDTO.push(SliderMapper.fromEntityToDTO(slider)));
      resultList[0] = sliderDTO;
    }
    return resultList;
  }

  async save(sliderDTO: SliderDTO, creator?: string): Promise<SliderDTO | undefined> {
    const entity = SliderMapper.fromDTOtoEntity(sliderDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }

    if (sliderDTO.imageFile != null) {
      entity.imageFileUrl = await Helpers.saveFile(sliderDTO.imageFile, sliderDTO.imageFileContentType);
      entity.imageFile = null;
    }

    const result = await this.sliderRepository.save(entity);
    return SliderMapper.fromEntityToDTO(result);
  }

  async update(sliderDTO: SliderDTO, updater?: string): Promise<SliderDTO | undefined> {
    const entity = SliderMapper.fromDTOtoEntity(sliderDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }

    if (sliderDTO.imageFile != null) {
      entity.imageFileUrl = await Helpers.saveFile(sliderDTO.imageFile, sliderDTO.imageFileContentType);
      entity.imageFile = null;
    }

    const result = await this.sliderRepository.save(entity);
    return SliderMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.sliderRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
