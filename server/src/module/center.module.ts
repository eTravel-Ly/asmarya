import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CenterController } from '../web/rest/center.controller';
import { CenterRepository } from '../repository/center.repository';
import { CenterService } from '../service/center.service';

@Module({
  imports: [TypeOrmModule.forFeature([CenterRepository])],
  controllers: [CenterController],
  providers: [CenterService],
  exports: [CenterService],
})
export class CenterModule {}
