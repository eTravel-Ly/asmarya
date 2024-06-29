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
import { PaymentMethodDTO } from '../../service/dto/payment-method.dto';
import { PaymentMethodService } from '../../service/payment-method.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/payment-methods')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('payment-methods')
export class PaymentMethodController {
  logger = new Logger('PaymentMethodController');

  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: PaymentMethodDTO,
  })
  async getAll(@Req() req: Request): Promise<PaymentMethodDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.paymentMethodService.findAndCount({
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
    type: PaymentMethodDTO,
  })
  async getOne(@Param('id') id: number): Promise<PaymentMethodDTO> {
    return await this.paymentMethodService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create paymentMethod' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: PaymentMethodDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() paymentMethodDTO: PaymentMethodDTO): Promise<PaymentMethodDTO> {
    const created = await this.paymentMethodService.save(paymentMethodDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PaymentMethod', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update paymentMethod' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PaymentMethodDTO,
  })
  async put(@Req() req: Request, @Body() paymentMethodDTO: PaymentMethodDTO): Promise<PaymentMethodDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PaymentMethod', paymentMethodDTO.id);
    return await this.paymentMethodService.update(paymentMethodDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update paymentMethod with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: PaymentMethodDTO,
  })
  async putId(@Req() req: Request, @Body() paymentMethodDTO: PaymentMethodDTO): Promise<PaymentMethodDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'PaymentMethod', paymentMethodDTO.id);
    return await this.paymentMethodService.update(paymentMethodDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete paymentMethod' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'PaymentMethod', id);
    return await this.paymentMethodService.deleteById(id);
  }
}
