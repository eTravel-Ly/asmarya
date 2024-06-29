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
import { SliderDTO } from '../../service/dto/slider.dto';
import { SliderService } from '../../service/slider.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sliders')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('sliders')
export class SliderController {
  logger = new Logger('SliderController');

  constructor(private readonly sliderService: SliderService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SliderDTO,
  })
  async getAll(@Req() req: Request): Promise<SliderDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.sliderService.findAndCount({
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
    type: SliderDTO,
  })
  async getOne(@Param('id') id: number): Promise<SliderDTO> {
    return await this.sliderService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create slider' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: SliderDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() sliderDTO: SliderDTO): Promise<SliderDTO> {
    const created = await this.sliderService.save(sliderDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Slider', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update slider' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SliderDTO,
  })
  async put(@Req() req: Request, @Body() sliderDTO: SliderDTO): Promise<SliderDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Slider', sliderDTO.id);
    return await this.sliderService.update(sliderDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update slider with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: SliderDTO,
  })
  async putId(@Req() req: Request, @Body() sliderDTO: SliderDTO): Promise<SliderDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Slider', sliderDTO.id);
    return await this.sliderService.update(sliderDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete slider' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Slider', id);
    return await this.sliderService.deleteById(id);
  }
}
