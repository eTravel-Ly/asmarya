import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationController } from '../web/rest/activation.controller';
import { ActivationRepository } from '../repository/activation.repository';
import { ActivationService } from '../service/activation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivationRepository])],
  controllers: [ActivationController],
  providers: [ActivationService],
  exports: [ActivationService],
})
export class ActivationModule {}
