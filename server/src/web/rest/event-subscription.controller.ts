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
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventSubscriptionDTO } from '../../service/dto/event-subscription.dto';
import { EventSubscriptionService } from '../../service/event-subscription.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { EventSubscriptionFilter } from '../../service/dto/filter/event-subscription.filter';
import { BaseFilter } from '../../domain/base/filter.entity';
import * as console from 'console';

@Controller('api/event-subscriptions')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('event-subscriptions')
export class EventSubscriptionController {
  logger = new Logger('EventSubscriptionController');

  constructor(private readonly eventSubscriptionService: EventSubscriptionService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EventSubscriptionDTO,
  })
  async getAll(@Req() req: Request, @Query() filter: EventSubscriptionFilter): Promise<EventSubscriptionDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);

    // Ensure only filters related to EventSubscriptionFilter are applied
    const baseFilter = new BaseFilter();
    Object.assign(baseFilter, filter);

    console.log('where (filters only):', baseFilter.toQueryFilter());

    const [results, count] = await this.eventSubscriptionService.findAndCount({
      where: baseFilter.toQueryFilter(), // Transform filter fields to query format
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
    type: EventSubscriptionDTO,
  })
  async getOne(@Param('id') id: number): Promise<EventSubscriptionDTO> {
    return await this.eventSubscriptionService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create eventSubscription' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EventSubscriptionDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() eventSubscriptionDTO: EventSubscriptionDTO): Promise<EventSubscriptionDTO> {
    const created = await this.eventSubscriptionService.save(eventSubscriptionDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EventSubscription', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update eventSubscription' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EventSubscriptionDTO,
  })
  async put(@Req() req: Request, @Body() eventSubscriptionDTO: EventSubscriptionDTO): Promise<EventSubscriptionDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EventSubscription', eventSubscriptionDTO.id);
    return await this.eventSubscriptionService.update(eventSubscriptionDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update eventSubscription with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EventSubscriptionDTO,
  })
  async putId(@Req() req: Request, @Body() eventSubscriptionDTO: EventSubscriptionDTO): Promise<EventSubscriptionDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'EventSubscription', eventSubscriptionDTO.id);
    return await this.eventSubscriptionService.update(eventSubscriptionDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete eventSubscription' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'EventSubscription', id);
    return await this.eventSubscriptionService.deleteById(id);
  }
}
