import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ActivationDTO } from '../service/dto/activation.dto';
import { ActivationMapper } from '../service/mapper/activation.mapper';
import { ActivationRepository } from '../repository/activation.repository';
import { RequestOtpVm } from './dto/vm/request-otp.vm';
import { Activation } from '../domain/activation.entity';
import { MailerService } from '@nestjs-modules/mailer';

const relationshipNames = [];

@Injectable()
export class ActivationService {
  logger = new Logger('ActivationService');

  constructor(
    @InjectRepository(ActivationRepository) private activationRepository: ActivationRepository,
    private readonly mailService: MailerService,
  ) {}

  async findById(id: number): Promise<ActivationDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.activationRepository.findOne(id, options);
    return ActivationMapper.fromEntityToDTO(result);
  }

  async findByFields(options: FindOneOptions<ActivationDTO>): Promise<ActivationDTO | undefined> {
    const result = await this.activationRepository.findOne(options);
    return ActivationMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ActivationDTO>): Promise<[ActivationDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.activationRepository.findAndCount(options);
    const activationDTO: ActivationDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(activation => activationDTO.push(ActivationMapper.fromEntityToDTO(activation)));
      resultList[0] = activationDTO;
    }
    return resultList;
  }

  async save(activationDTO: ActivationDTO, creator?: string): Promise<ActivationDTO | undefined> {
    const entity = ActivationMapper.fromDTOtoEntity(activationDTO);
    if (creator) {
      if (!entity.createdBy) {
        entity.createdBy = creator;
      }
      entity.lastModifiedBy = creator;
    }
    const result = await this.activationRepository.save(entity);
    return ActivationMapper.fromEntityToDTO(result);
  }

  async update(activationDTO: ActivationDTO, updater?: string): Promise<ActivationDTO | undefined> {
    const entity = ActivationMapper.fromDTOtoEntity(activationDTO);
    if (updater) {
      entity.lastModifiedBy = updater;
    }
    const result = await this.activationRepository.save(entity);
    return ActivationMapper.fromEntityToDTO(result);
  }

  async deleteById(id: number): Promise<void | undefined> {
    await this.activationRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }

  async requestOTP(requestOtpVm: RequestOtpVm) {
    const email = requestOtpVm.email;
    let newActivation;

    const activationOptional = await this.activationRepository.findOne({ where: { email } });

    newActivation = activationOptional || new Activation();
    const code = Math.floor(100000 + Math.random() * 900000);
    newActivation.email = email;
    newActivation.code = code;
    newActivation.isUsed = false;
    newActivation.validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
    newActivation.sentOn = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const result = await this.activationRepository.save(newActivation);

    const user = { email, login: email, resetKey: result.code };
    await this.mailService.sendMail({
      from: 'Test otp <otp@network.com.ly>',
      to: email,
      subject: `Otp for activation`,
      text: code.toString(),
    });
  }

  async checkOTP(email: string, otp: string): Promise<boolean> {
    const activation = await this.activationRepository.findOne({ where: { email } });

    if (!activation || activation.code !== otp) {
      throw new HttpException('INVALID_OTP', HttpStatus.BAD_REQUEST);
    } else if (activation.isUsed) {
      throw new HttpException('OTP_ALREADY_USED', HttpStatus.BAD_REQUEST);
    } else if (new Date(activation.validUntil) < new Date()) {
      throw new HttpException('OTP_EXPIRED', HttpStatus.BAD_REQUEST);
    } else {
      activation.isUsed = true;
      await this.activationRepository.save(activation);
      return true;
    }
  }
}
