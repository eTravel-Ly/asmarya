import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseVideoController } from '../web/rest/course-video.controller';
import { CourseVideoRepository } from '../repository/course-video.repository';
import { CourseVideoService } from '../service/course-video.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseVideoRepository])],
  controllers: [CourseVideoController],
  providers: [CourseVideoService],
  exports: [CourseVideoService],
})
export class CourseVideoModule {}
