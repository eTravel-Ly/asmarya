import { Body, Controller, Logger, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { LearnerService } from '../../service/learner.service';
import { Post as PostMethod } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { LearnerVM } from '../../service/dto/vm/learner.vm';
import { LearnerDTO } from '../../service/dto/learner.dto';
import { HeaderUtil } from '../../client/header-util';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('website')
export class WebsiteController {
  logger = new Logger('WebsiteController');

  constructor(private readonly learnerService: LearnerService) {}

  @PostMethod('/public/learner/register')
  @ApiOperation({ summary: 'Register learner' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LearnerDTO,
  })
  async register(@Req() req: Request, @Body() learnerVM: LearnerVM): Promise<LearnerDTO> {
    const created = await this.learnerService.register(learnerVM);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Learner', created.id);
    return created;
  }
}
