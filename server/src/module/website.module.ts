import { Module } from '@nestjs/common';
import { WebsiteController } from '../web/rest/website.controller';
import { LearnerModule } from './learner.module';
import { ActivationModule } from './activation.module';

@Module({
  imports: [LearnerModule, ActivationModule],
  controllers: [WebsiteController],
  providers: [],
  exports: [],
})
export class WebsiteModule {}
