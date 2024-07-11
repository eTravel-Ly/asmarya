import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearnerController } from '../web/rest/learner.controller';
import { LearnerRepository } from '../repository/learner.repository';
import { LearnerService } from '../service/learner.service';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([LearnerRepository]), AuthModule],
  controllers: [LearnerController],
  providers: [LearnerService],
  exports: [LearnerService],
})
export class LearnerModule {}
