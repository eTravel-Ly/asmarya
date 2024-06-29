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
import { CartItemDTO } from '../../service/dto/cart-item.dto';
import { CartItemService } from '../../service/cart-item.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cart-items')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('cart-items')
export class CartItemController {
  logger = new Logger('CartItemController');

  constructor(private readonly cartItemService: CartItemService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: CartItemDTO,
  })
  async getAll(@Req() req: Request): Promise<CartItemDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.cartItemService.findAndCount({
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
    type: CartItemDTO,
  })
  async getOne(@Param('id') id: number): Promise<CartItemDTO> {
    return await this.cartItemService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create cartItem' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: CartItemDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() cartItemDTO: CartItemDTO): Promise<CartItemDTO> {
    const created = await this.cartItemService.save(cartItemDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CartItem', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update cartItem' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CartItemDTO,
  })
  async put(@Req() req: Request, @Body() cartItemDTO: CartItemDTO): Promise<CartItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CartItem', cartItemDTO.id);
    return await this.cartItemService.update(cartItemDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update cartItem with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: CartItemDTO,
  })
  async putId(@Req() req: Request, @Body() cartItemDTO: CartItemDTO): Promise<CartItemDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'CartItem', cartItemDTO.id);
    return await this.cartItemService.update(cartItemDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete cartItem' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'CartItem', id);
    return await this.cartItemService.deleteById(id);
  }
}
