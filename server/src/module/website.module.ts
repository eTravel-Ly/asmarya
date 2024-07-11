import { Module } from '@nestjs/common';
import { WebsiteController } from '../web/rest/website.controller';
import { LearnerModule } from './learner.module';

@Module({
  imports: [LearnerModule],
  controllers: [WebsiteController],
  providers: [],
  exports: [],
})
export class WebsiteModule {}
