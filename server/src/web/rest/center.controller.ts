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
import { CenterDTO } from '../../service/dto/center.dto';
import { CenterService } from '../../service/center.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/centers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('centers')
export class CenterController {
  logger = new Logger('CenterController');

  constructor(private readonly centerService: CenterService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CenterDTO,
  })
  async getAll(@Req() req: Request): Promise<CenterDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.centerService.findAndCount({
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
    type: CenterDTO,
  })
  async getOne(@Param('id') id: number): Promise<CenterDTO> {
    return await this.centerService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create center' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CenterDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() centerDTO: CenterDTO): Promise<CenterDTO> {
    const created = await this.centerService.save(centerDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Center', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update center' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CenterDTO,
  })
  async put(@Req() req: Request, @Body() centerDTO: CenterDTO): Promise<CenterDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Center', centerDTO.id);
    return await this.centerService.update(centerDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update center with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CenterDTO,
  })
  async putId(@Req() req: Request, @Body() centerDTO: CenterDTO): Promise<CenterDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Center', centerDTO.id);
    return await this.centerService.update(centerDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete center' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Center', id);
    return await this.centerService.deleteById(id);
  }
}
