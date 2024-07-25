import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { LearnerDTO } from '../service/dto/learner.dto';
import { LearnerMapper } from '../service/mapper/learner.mapper';
import { LearnerRepository } from '../repository/learner.repository';
import { LearnerVM } from './dto/vm/learner.vm';
import { UserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';
import { LearnerType } from '../domain/enumeration/learner-type';
import { Transactional } from 'typeorm-transactional-cls-hooked';

const relationshipNames = [];

@Injectable()
export class LearnerService {
  logger = new Logger('LearnerService');

  constructor(
    @InjectRepository(LearnerRepository) private learnerRepository: LearnerRepository,
    private authService: AuthService,
  ) {}

  async findById(id: number): Promise<LearnerDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.learnerRepository.findOne(id, options);
    return LearnerMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<LearnerDTO>): Promise<LearnerDTO | undefined> {
    const result = await this.learnerRepository.findOne(options);
    return LearnerMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<LearnerDTO>): Promise<[LearnerDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.learnerRepository.findAndCount(options);
    const learnerDTO: LearnerDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(learner => learnerDTO.push(LearnerMapper.fromEntityToDTO(learner)));
      resultList[0] = learnerDTO;
    }
    return resultList;
  }

  async save(learnerDTO: LearnerDTO, creator?: string): Promise<LearnerDTO | undefined> {
    const entity = LearnerMapper.fromDTOtoEntity(learnerDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.learnerRepository.save(entity);
    return LearnerMapper.fromEntityToDTO(result);
  }

  async update(learnerDTO: LearnerDTO, updater?: string): Promise<LearnerDTO | undefined> {
    const entity = LearnerMapper.fromDTOtoEntity(learnerDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.learnerRepository.save(entity);
    return LearnerMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.learnerRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }

  @Transactional()
  async register(learnerVM: LearnerVM) {
    const learnerDTO = new LearnerDTO();
    learnerDTO.firstName = learnerVM.firstName;
    learnerDTO.lastName = learnerVM.lastName;
    learnerDTO.birthYear = learnerVM.birthYear;
    learnerDTO.email = learnerVM.email;
    learnerDTO.mobileNo = learnerVM.mobileNo;
    learnerDTO.learnerType = learnerVM.learnerType;

    //create new user and save it and use the user in learnerDTO.user

    const newUser = new UserDTO();
    newUser.login = learnerVM.email;
    newUser.firstName = learnerVM.firstName;
    newUser.lastName = learnerVM.lastName;
    newUser.email = learnerVM.email;
    newUser.password = learnerVM.password;
    newUser.activated = true;
    newUser.langKey = 'en';

    let roles: string[] = [];
    if (learnerVM.learnerType === LearnerType.INTERNAL_STUDENT) {
      roles = ['ROLE_INTERNAL_STUDENT'];
    } else if (learnerVM.learnerType === LearnerType.EXTERNAL_STUDENT) {
      roles = ['ROLE_EXTERNAL_STUDENT'];
    } else if (learnerVM.learnerType === LearnerType.INSTRUCTOR) {
      roles = ['ROLE_INSTRUCTOR'];
    } else if (learnerVM.learnerType === LearnerType.PUBLIC) {
      roles = ['ROLE_PUBLIC'];
    }

    learnerDTO.user = await this.authService.registerNewUser(newUser, roles);

    //learnerDTO.password = learnerVM.password;
    const entity = LearnerMapper.fromDTOtoEntity(learnerDTO);
    const result = await this.learnerRepository.save(entity);
    return LearnerMapper.fromEntityToDTO(result);
  }
}
