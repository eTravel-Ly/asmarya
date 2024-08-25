import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EventSubscriptionDTO } from '../service/dto/event-subscription.dto';
import { EventSubscriptionMapper } from '../service/mapper/event-subscription.mapper';
import { EventSubscriptionRepository } from '../repository/event-subscription.repository';

const relationshipNames = [];
relationshipNames.push('event');
relationshipNames.push('learner');

@Injectable()
export class EventSubscriptionService {
  logger = new Logger('EventSubscriptionService');

  constructor(@InjectRepository(EventSubscriptionRepository) private eventSubscriptionRepository: EventSubscriptionRepository) {}

  async findById(id: number): Promise<EventSubscriptionDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.eventSubscriptionRepository.findOne(id, options);
    return EventSubscriptionMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<EventSubscriptionDTO>): Promise<EventSubscriptionDTO | undefined> {
    const result = await this.eventSubscriptionRepository.findOne(options);
    return EventSubscriptionMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<EventSubscriptionDTO>): Promise<[EventSubscriptionDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.eventSubscriptionRepository.findAndCount(options);
    const eventSubscriptionDTO: EventSubscriptionDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(eventSubscription => eventSubscriptionDTO.push(EventSubscriptionMapper.fromEntityToDTO(eventSubscription)));
      resultList[0] = eventSubscriptionDTO;
    }
    return resultList;
  }

  async save(eventSubscriptionDTO: EventSubscriptionDTO, creator?: string): Promise<EventSubscriptionDTO | undefined> {
    const entity = EventSubscriptionMapper.fromDTOtoEntity(eventSubscriptionDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.eventSubscriptionRepository.save(entity);
    return EventSubscriptionMapper.fromEntityToDTO(result);
  }

  async update(eventSubscriptionDTO: EventSubscriptionDTO, updater?: string): Promise<EventSubscriptionDTO | undefined> {
    const entity = EventSubscriptionMapper.fromDTOtoEntity(eventSubscriptionDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.eventSubscriptionRepository.save(entity);
    return EventSubscriptionMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.eventSubscriptionRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
