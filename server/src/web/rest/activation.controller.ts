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
import { ActivationDTO } from '../../service/dto/activation.dto';
import { ActivationService } from '../../service/activation.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/activations')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('activations')
export class ActivationController {
  logger = new Logger('ActivationController');

  constructor(private readonly activationService: ActivationService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: ActivationDTO,
  })
  async getAll(@Req() req: Request): Promise<ActivationDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.activationService.findAndCount({
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
    type: ActivationDTO,
  })
  async getOne(@Param('id') id: number): Promise<ActivationDTO> {
    return await this.activationService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create activation' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: ActivationDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() activationDTO: ActivationDTO): Promise<ActivationDTO> {
    const created = await this.activationService.save(activationDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activation', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update activation' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ActivationDTO,
  })
  async put(@Req() req: Request, @Body() activationDTO: ActivationDTO): Promise<ActivationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activation', activationDTO.id);
    return await this.activationService.update(activationDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update activation with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: ActivationDTO,
  })
  async putId(@Req() req: Request, @Body() activationDTO: ActivationDTO): Promise<ActivationDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activation', activationDTO.id);
    return await this.activationService.update(activationDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete activation' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Activation', id);
    return await this.activationService.deleteById(id);
  }
}
