import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CourseVideoDTO } from '../service/dto/course-video.dto';
import { CourseVideoMapper } from '../service/mapper/course-video.mapper';
import { CourseVideoRepository } from '../repository/course-video.repository';

const relationshipNames = [];
relationshipNames.push('course');

@Injectable()
export class CourseVideoService {
  logger = new Logger('CourseVideoService');

  constructor(@InjectRepository(CourseVideoRepository) private courseVideoRepository: CourseVideoRepository) {}

  async findById(id: number): Promise<CourseVideoDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.courseVideoRepository.findOne(id, options);
    return CourseVideoMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<CourseVideoDTO>): Promise<CourseVideoDTO | undefined> {
    const result = await this.courseVideoRepository.findOne(options);
    return CourseVideoMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CourseVideoDTO>): Promise<[CourseVideoDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.courseVideoRepository.findAndCount(options);
    const courseVideoDTO: CourseVideoDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(courseVideo => courseVideoDTO.push(CourseVideoMapper.fromEntityToDTO(courseVideo)));
      resultList[0] = courseVideoDTO;
    }
    return resultList;
  }

  async save(courseVideoDTO: CourseVideoDTO, creator?: string): Promise<CourseVideoDTO | undefined> {
    const entity = CourseVideoMapper.fromDTOtoEntity(courseVideoDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.courseVideoRepository.save(entity);
    return CourseVideoMapper.fromEntityToDTO(result);
  }

  async update(courseVideoDTO: CourseVideoDTO, updater?: string): Promise<CourseVideoDTO | undefined> {
    const entity = CourseVideoMapper.fromDTOtoEntity(courseVideoDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.courseVideoRepository.save(entity);
    return CourseVideoMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.courseVideoRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
