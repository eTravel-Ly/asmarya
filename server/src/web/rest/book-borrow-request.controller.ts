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
import { BookBorrowRequestDTO } from '../../service/dto/book-borrow-request.dto';
import { BookBorrowRequestService } from '../../service/book-borrow-request.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/book-borrow-requests')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('book-borrow-requests')
export class BookBorrowRequestController {
  logger = new Logger('BookBorrowRequestController');

  constructor(private readonly bookBorrowRequestService: BookBorrowRequestService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: BookBorrowRequestDTO,
  })
  async getAll(@Req() req: Request): Promise<BookBorrowRequestDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.bookBorrowRequestService.findAndCount({
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
    type: BookBorrowRequestDTO,
  })
  async getOne(@Param('id') id: number): Promise<BookBorrowRequestDTO> {
    return await this.bookBorrowRequestService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create bookBorrowRequest' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: BookBorrowRequestDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() bookBorrowRequestDTO: BookBorrowRequestDTO): Promise<BookBorrowRequestDTO> {
    const created = await this.bookBorrowRequestService.save(bookBorrowRequestDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'BookBorrowRequest', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update bookBorrowRequest' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BookBorrowRequestDTO,
  })
  async put(@Req() req: Request, @Body() bookBorrowRequestDTO: BookBorrowRequestDTO): Promise<BookBorrowRequestDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'BookBorrowRequest', bookBorrowRequestDTO.id);
    return await this.bookBorrowRequestService.update(bookBorrowRequestDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update bookBorrowRequest with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: BookBorrowRequestDTO,
  })
  async putId(@Req() req: Request, @Body() bookBorrowRequestDTO: BookBorrowRequestDTO): Promise<BookBorrowRequestDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'BookBorrowRequest', bookBorrowRequestDTO.id);
    return await this.bookBorrowRequestService.update(bookBorrowRequestDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete bookBorrowRequest' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'BookBorrowRequest', id);
    return await this.bookBorrowRequestService.deleteById(id);
  }
}
