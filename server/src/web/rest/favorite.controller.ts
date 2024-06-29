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
import { FavoriteDTO } from '../../service/dto/favorite.dto';
import { FavoriteService } from '../../service/favorite.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/favorites')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('favorites')
export class FavoriteController {
  logger = new Logger('FavoriteController');

  constructor(private readonly favoriteService: FavoriteService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FavoriteDTO,
  })
  async getAll(@Req() req: Request): Promise<FavoriteDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.favoriteService.findAndCount({
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
    type: FavoriteDTO,
  })
  async getOne(@Param('id') id: number): Promise<FavoriteDTO> {
    return await this.favoriteService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create favorite' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FavoriteDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() favoriteDTO: FavoriteDTO): Promise<FavoriteDTO> {
    const created = await this.favoriteService.save(favoriteDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Favorite', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update favorite' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FavoriteDTO,
  })
  async put(@Req() req: Request, @Body() favoriteDTO: FavoriteDTO): Promise<FavoriteDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Favorite', favoriteDTO.id);
    return await this.favoriteService.update(favoriteDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update favorite with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FavoriteDTO,
  })
  async putId(@Req() req: Request, @Body() favoriteDTO: FavoriteDTO): Promise<FavoriteDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Favorite', favoriteDTO.id);
    return await this.favoriteService.update(favoriteDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete favorite' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Favorite', id);
    return await this.favoriteService.deleteById(id);
  }
}
