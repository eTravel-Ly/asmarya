import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { LearnerService } from '../../service/learner.service';
import { Post as PostMethod } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { LearnerVM } from '../../service/dto/vm/learner.vm';
import { LearnerDTO } from '../../service/dto/learner.dto';
import { HeaderUtil } from '../../client/header-util';
import { ActivationService } from '../../service/activation.service';
import { RequestOtpVm } from '../../service/dto/vm/request-otp.vm';
import path from 'path';
import fs from 'fs';
import * as os from 'os';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('website')
export class WebsiteController {
  logger = new Logger('WebsiteController');

  constructor(
    private readonly learnerService: LearnerService,
    private readonly activationService: ActivationService,
  ) {}

  @PostMethod('/public/activation/request-otp')
  @ApiOperation({ summary: 'Request OTP for activation' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async requestOTP(@Req() req: Request, @Body() requestOtpVm: RequestOtpVm): Promise<void> {
    await this.activationService.requestOTP(requestOtpVm);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activation', 'OTP');
  }

  @PostMethod('/public/learner/register')
  @ApiOperation({ summary: 'Register learner' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LearnerDTO,
  })
  async register(@Req() req: Request, @Body() learnerVM: LearnerVM): Promise<LearnerDTO> {
    // check otp
    if (!this.activationService.checkOTP(learnerVM.email, learnerVM.otp)) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    const created = await this.learnerService.register(learnerVM);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Learner', created.id);
    return created;
  }

  @Get('/uploads/file/download/:fileName')
  async downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const uploadDir = os.homedir() + '/uploads/asmarya/';
      const fileContent = await fs.promises.readFile(path.join(uploadDir, fileName));

      console.log('fileName', fileName);
      // console.log('fileContent', fileContent);
      console.log('uploadDir', uploadDir);

      if (fileName.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (fileName.endsWith('.jpeg') || fileName.endsWith('.jpg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (fileName.endsWith('.gif')) {
        res.setHeader('Content-Type', 'image/gif');
      } else if (fileName.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      } else if (fileName.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
      } else {
        res.setHeader('Content-Type', 'application/octet-stream');
      }
      res.end(fileContent);
    } catch (error) {
      throw new Error(error);
    }
  }
}
