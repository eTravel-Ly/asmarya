import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SliderController } from '../web/rest/slider.controller';
import { SliderRepository } from '../repository/slider.repository';
import { SliderService } from '../service/slider.service';

@Module({
  imports: [TypeOrmModule.forFeature([SliderRepository])],
  controllers: [SliderController],
  providers: [SliderService],
  exports: [SliderService],
})
export class SliderModule {}
