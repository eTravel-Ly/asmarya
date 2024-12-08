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
import { SheikhDTO } from '../../service/dto/sheikh.dto';
import { SheikhService } from '../../service/sheikh.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sheikhs')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('sheikhs')
export class SheikhController {
  logger = new Logger('SheikhController');

  constructor(private readonly sheikhService: SheikhService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SheikhDTO,
  })
  async getAll(@Req() req: Request): Promise<SheikhDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.sheikhService.findAndCount({
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
    type: SheikhDTO,
  })
  async getOne(@Param('id') id: number): Promise<SheikhDTO> {
    return await this.sheikhService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create sheikh' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SheikhDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() sheikhDTO: SheikhDTO): Promise<SheikhDTO> {
    const created = await this.sheikhService.save(sheikhDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Sheikh', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update sheikh' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SheikhDTO,
  })
  async put(@Req() req: Request, @Body() sheikhDTO: SheikhDTO): Promise<SheikhDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Sheikh', sheikhDTO.id);
    return await this.sheikhService.update(sheikhDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update sheikh with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SheikhDTO,
  })
  async putId(@Req() req: Request, @Body() sheikhDTO: SheikhDTO): Promise<SheikhDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Sheikh', sheikhDTO.id);
    return await this.sheikhService.update(sheikhDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete sheikh' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Sheikh', id);
    return await this.sheikhService.deleteById(id);
  }
}
