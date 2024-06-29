import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { LearnerDTO } from '../../service/dto/learner.dto';
import { LearnerService } from '../../service/learner.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/learners')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('learners')
export class LearnerController {
  logger = new Logger('LearnerController');

  constructor(private readonly learnerService: LearnerService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: LearnerDTO,
  })
  async getAll(@Req() req: Request): Promise<LearnerDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.learnerService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: LearnerDTO,
  })
  async getOne(@Param('id') id: number): Promise<LearnerDTO> {
    return await this.learnerService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create learner' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LearnerDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() learnerDTO: LearnerDTO): Promise<LearnerDTO> {
    const created = await this.learnerService.save(learnerDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Learner', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update learner' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LearnerDTO,
  })
  async put(@Req() req: Request, @Body() learnerDTO: LearnerDTO): Promise<LearnerDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Learner', learnerDTO.id);
    return await this.learnerService.update(learnerDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update learner with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: LearnerDTO,
  })
  async putId(@Req() req: Request, @Body() learnerDTO: LearnerDTO): Promise<LearnerDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Learner', learnerDTO.id);
    return await this.learnerService.update(learnerDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete learner' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Learner', id);
    return await this.learnerService.deleteById(id);
  }
}
