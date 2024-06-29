import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { BookBorrowRequestDTO } from '../service/dto/book-borrow-request.dto';
import { BookBorrowRequestMapper } from '../service/mapper/book-borrow-request.mapper';
import { BookBorrowRequestRepository } from '../repository/book-borrow-request.repository';

const relationshipNames = [];
relationshipNames.push('book');
relationshipNames.push('learner');

@Injectable()
export class BookBorrowRequestService {
  logger = new Logger('BookBorrowRequestService');

  constructor(@InjectRepository(BookBorrowRequestRepository) private bookBorrowRequestRepository: BookBorrowRequestRepository) {}

  async findById(id: number): Promise<BookBorrowRequestDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.bookBorrowRequestRepository.findOne(id, options);
    return BookBorrowRequestMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<BookBorrowRequestDTO>): Promise<BookBorrowRequestDTO | undefined> {
    const result = await this.bookBorrowRequestRepository.findOne(options);
    return BookBorrowRequestMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<BookBorrowRequestDTO>): Promise<[BookBorrowRequestDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.bookBorrowRequestRepository.findAndCount(options);
    const bookBorrowRequestDTO: BookBorrowRequestDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(bookBorrowRequest => bookBorrowRequestDTO.push(BookBorrowRequestMapper.fromEntityToDTO(bookBorrowRequest)));
      resultList[0] = bookBorrowRequestDTO;
    }
    return resultList;
  }

  async save(bookBorrowRequestDTO: BookBorrowRequestDTO, creator?: string): Promise<BookBorrowRequestDTO | undefined> {
    const entity = BookBorrowRequestMapper.fromDTOtoEntity(bookBorrowRequestDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.bookBorrowRequestRepository.save(entity);
    return BookBorrowRequestMapper.fromEntityToDTO(result);
  }

  async update(bookBorrowRequestDTO: BookBorrowRequestDTO, updater?: string): Promise<BookBorrowRequestDTO | undefined> {
    const entity = BookBorrowRequestMapper.fromDTOtoEntity(bookBorrowRequestDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.bookBorrowRequestRepository.save(entity);
    return BookBorrowRequestMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.bookBorrowRequestRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
