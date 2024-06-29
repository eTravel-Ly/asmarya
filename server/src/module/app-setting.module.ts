import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettingController } from '../web/rest/app-setting.controller';
import { AppSettingRepository } from '../repository/app-setting.repository';
import { AppSettingService } from '../service/app-setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([AppSettingRepository])],
  controllers: [AppSettingController],
  providers: [AppSettingService],
  exports: [AppSettingService],
})
export class AppSettingModule {}
