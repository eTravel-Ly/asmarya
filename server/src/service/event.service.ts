import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EventDTO } from '../service/dto/event.dto';
import { EventMapper } from '../service/mapper/event.mapper';
import { EventRepository } from '../repository/event.repository';
import { Helpers } from './utils/helpers';

const relationshipNames = [];

@Injectable()
export class EventService {
  logger = new Logger('EventService');

  constructor(@InjectRepository(EventRepository) private eventRepository: EventRepository) {}

  async findById(id: number): Promise<EventDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.eventRepository.findOne(id, options);
    return EventMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<EventDTO>): Promise<EventDTO | undefined> {
    const result = await this.eventRepository.findOne(options);
    return EventMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<EventDTO>): Promise<[EventDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.eventRepository.findAndCount(options);
    const eventDTO: EventDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(event => eventDTO.push(EventMapper.fromEntityToDTO(event)));
      resultList[0] = eventDTO;
    }
    return resultList;
  }

  async save(eventDTO: EventDTO, creator?: string): Promise<EventDTO | undefined> {
    const entity = EventMapper.fromDTOtoEntity(eventDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }

    if (eventDTO.coverImageFile != null) {
      entity.coverImageUrl = await Helpers.saveFile(eventDTO.coverImageFile, eventDTO.coverImageFileContentType);
      entity.coverImageFile = null;
    }

    const result = await this.eventRepository.save(entity);
    return EventMapper.fromEntityToDTO(result);
  }

  async update(eventDTO: EventDTO, updater?: string): Promise<EventDTO | undefined> {
    const entity = EventMapper.fromDTOtoEntity(eventDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }

    if (eventDTO.coverImageFile != null) {
      entity.coverImageUrl = await Helpers.saveFile(eventDTO.coverImageFile, eventDTO.coverImageFileContentType);
      entity.coverImageFile = null;
    }

    const result = await this.eventRepository.save(entity);
    return EventMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.eventRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
