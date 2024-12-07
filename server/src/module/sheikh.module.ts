import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheikhController } from '../web/rest/sheikh.controller';
import { SheikhRepository } from '../repository/sheikh.repository';
import { SheikhService } from '../service/sheikh.service';

@Module({
  imports: [TypeOrmModule.forFeature([SheikhRepository])],
  controllers: [SheikhController],
  providers: [SheikhService],
  exports: [SheikhService],
})
export class SheikhModule {}
