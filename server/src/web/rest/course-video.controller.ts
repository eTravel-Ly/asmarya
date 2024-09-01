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
import { CourseVideoDTO } from '../../service/dto/course-video.dto';
import { CourseVideoService } from '../../service/course-video.service';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/course-videos')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('course-videos')
export class CourseVideoController {
  logger = new Logger('CourseVideoController');

  constructor(private readonly courseVideoService: CourseVideoService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CourseVideoDTO,
  })
  async getAll(@Req() req: Request): Promise<CourseVideoDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const courseId = req.query.courseId; // Get courseId from query params

    const [results, count] = await this.courseVideoService.findAndCount({
      where: courseId ? { course: { id: courseId } } : {}, // Filter by courseId if provided
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
    type: CourseVideoDTO,
  })
  async getOne(@Param('id') id: number): Promise<CourseVideoDTO> {
    return await this.courseVideoService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create courseVideo' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CourseVideoDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() courseVideoDTO: CourseVideoDTO): Promise<CourseVideoDTO> {
    const created = await this.courseVideoService.save(courseVideoDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CourseVideo', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update courseVideo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CourseVideoDTO,
  })
  async put(@Req() req: Request, @Body() courseVideoDTO: CourseVideoDTO): Promise<CourseVideoDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CourseVideo', courseVideoDTO.id);
    return await this.courseVideoService.update(courseVideoDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update courseVideo with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CourseVideoDTO,
  })
  async putId(@Req() req: Request, @Body() courseVideoDTO: CourseVideoDTO): Promise<CourseVideoDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CourseVideo', courseVideoDTO.id);
    return await this.courseVideoService.update(courseVideoDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete courseVideo' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CourseVideo', id);
    return await this.courseVideoService.deleteById(id);
  }
}
