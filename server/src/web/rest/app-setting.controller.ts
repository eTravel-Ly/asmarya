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
import { AppSettingDTO } from '../../service/dto/app-setting.dto';
import { AppSettingService } from '../../service/app-setting.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/app-settings')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('app-settings')
export class AppSettingController {
  logger = new Logger('AppSettingController');

  constructor(private readonly appSettingService: AppSettingService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: AppSettingDTO,
  })
  async getAll(@Req() req: Request): Promise<AppSettingDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.appSettingService.findAndCount({
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
    type: AppSettingDTO,
  })
  async getOne(@Param('id') id: number): Promise<AppSettingDTO> {
    return await this.appSettingService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create appSetting' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: AppSettingDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() appSettingDTO: AppSettingDTO): Promise<AppSettingDTO> {
    const created = await this.appSettingService.save(appSettingDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AppSetting', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update appSetting' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AppSettingDTO,
  })
  async put(@Req() req: Request, @Body() appSettingDTO: AppSettingDTO): Promise<AppSettingDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AppSetting', appSettingDTO.id);
    return await this.appSettingService.update(appSettingDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update appSetting with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: AppSettingDTO,
  })
  async putId(@Req() req: Request, @Body() appSettingDTO: AppSettingDTO): Promise<AppSettingDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'AppSetting', appSettingDTO.id);
    return await this.appSettingService.update(appSettingDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete appSetting' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'AppSetting', id);
    return await this.appSettingService.deleteById(id);
  }
}
