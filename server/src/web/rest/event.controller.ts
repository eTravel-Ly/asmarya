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
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EventDTO } from '../../service/dto/event.dto';
import { EventService } from '../../service/event.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/events')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('events')
export class EventController {
  logger = new Logger('EventController');

  constructor(private readonly eventService: EventService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: EventDTO,
  })
  async getAll(@Req() req: Request): Promise<EventDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.eventService.findAndCount({
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
    type: EventDTO,
  })
  async getOne(@Param('id') id: number): Promise<EventDTO> {
    return await this.eventService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create event' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: EventDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() eventDTO: EventDTO): Promise<EventDTO> {
    const created = await this.eventService.save(eventDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Event', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update event' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EventDTO,
  })
  async put(@Req() req: Request, @Body() eventDTO: EventDTO): Promise<EventDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Event', eventDTO.id);
    return await this.eventService.update(eventDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update event with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: EventDTO,
  })
  async putId(@Req() req: Request, @Body() eventDTO: EventDTO): Promise<EventDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Event', eventDTO.id);
    return await this.eventService.update(eventDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete event' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Event', id);
    return await this.eventService.deleteById(id);
  }
}
