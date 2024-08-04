import { Body, Controller, Get, Logger, Param, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';
import { LearnerService } from '../../service/learner.service';
import { Post as PostMethod } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { LearnerVM } from '../../service/dto/vm/learner.vm';
import { LearnerDTO } from '../../service/dto/learner.dto';
import { HeaderUtil } from '../../client/header-util';
import { ActivationService } from '../../service/activation.service';
import { RequestOtpVm } from '../../service/dto/vm/request-otp.vm';
import path from 'path';
import fs from 'fs';
import * as os from 'os';
import { AuthGuard } from '../../security';
import { SliderDTO } from '../../service/dto/slider.dto';
import { Page, PageRequest } from '../../domain/base/pagination.entity';
import { SliderService } from '../../service/slider.service';
import { BookDTO } from '../../service/dto/book.dto';
import { OrderItemService } from '../../service/order-item.service';
import { CourseDTO } from '../../service/dto/course.dto';
import { CartItemDTO } from '../../service/dto/cart-item.dto';
import { FavoriteService } from '../../service/favorite.service';
import { CartItemService } from '../../service/cart-item.service';
import { BookBorrowRequestService } from '../../service/book-borrow-request.service';
import { CommentService } from '../../service/comment.service';
import { NotificationService } from '../../service/notification.service';
import { OrderService } from '../../service/order.service';
import { FavoriteDTO } from '../../service/dto/favorite.dto';
import { FavoriteToggleVM } from '../../service/dto/vm/favorite-toggle.vm';
import { EntityType } from '../../domain/enumeration/entity-type';
import { BookService } from '../../service/book.service';
import { CourseService } from '../../service/course.service';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
@ApiTags('website')
export class WebsiteController {
  logger = new Logger('WebsiteController');

  constructor(
    private readonly learnerService: LearnerService,
    private readonly activationService: ActivationService,
    private readonly sliderService: SliderService,
    private readonly orderItemService: OrderItemService,
    private readonly orderService: OrderService,
    public readonly favoriteService: FavoriteService,
    public readonly cartItemService: CartItemService,
    public readonly bookBorrowRequestService: BookBorrowRequestService,
    public readonly commentService: CommentService,
    public readonly notificationService: NotificationService,
    public readonly bookService: BookService,
    public readonly courseService: CourseService,
  ) {}

  @PostMethod('/public/activation/request-otp')
  @ApiOperation({ summary: 'Request OTP for activation' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  async requestOTP(@Req() req: Request, @Body() requestOtpVm: RequestOtpVm): Promise<void> {
    await this.activationService.requestOTP(requestOtpVm);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Activation', 'OTP');
  }

  @PostMethod('/public/learner/register')
  @ApiOperation({ summary: 'Register learner' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: LearnerDTO,
  })
  async register(@Req() req: Request, @Body() learnerVM: LearnerVM): Promise<LearnerDTO> {
    try {
      // Check OTP
      await this.activationService.checkOTP(learnerVM.email, learnerVM.otp);
      const created = await this.learnerService.register(learnerVM);
      HeaderUtil.addEntityCreatedHeaders(req.res, 'Learner', created.id);
      return created;
    } catch (error) {
      throw error;
    }
  }

  @Get('/uploads/file/download/:fileName')
  async downloadFile(@Param('fileName') fileName: string, @Res() res: Response) {
    try {
      const uploadDir = os.homedir() + '/uploads/asmarya/';
      const fileContent = await fs.promises.readFile(path.join(uploadDir, fileName));

      console.log('fileName', fileName);
      // console.log('fileContent', fileContent);
      console.log('uploadDir', uploadDir);

      if (fileName.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (fileName.endsWith('.jpeg') || fileName.endsWith('.jpg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (fileName.endsWith('.gif')) {
        res.setHeader('Content-Type', 'image/gif');
      } else if (fileName.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      } else if (fileName.endsWith('.pdf')) {
        res.setHeader('Content-Type', 'application/pdf');
      } else {
        res.setHeader('Content-Type', 'application/octet-stream');
      }
      res.end(fileContent);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('/public/sliders')
  @ApiOperation({ summary: 'Get sliders' })
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: SliderDTO,
  })
  async getAllSliders(@Req() req: Request): Promise<SliderDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.sliderService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/my-profile')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile found',
  })
  getMyProfile(@Req() req: Request): any {
    const user: any = req.user;
    return this.learnerService.findByFields({ where: { user: { id: user.id } } });
  }

  @Get('/all-books')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Books' })
  @ApiResponse({
    status: 200,
    description: 'Books retrieved',
    type: BookDTO,
    isArray: true,
  })
  async getAllBooks(@Req() req: Request): Promise<BookDTO[]> {
    const [books, _] = await this.bookService.findAndCount({});
    return books;
  }

  @Get('/my-books')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get books ordered by the user' })
  @ApiResponse({
    status: 200,
    description: 'Books retrieved',
    type: BookDTO,
    isArray: true,
  })
  async getMyBooks(@Req() req: Request): Promise<BookDTO[]> {
    const user: any = req.user;
    const learner = await this.learnerService.findByFields({ where: { user: { id: user.id } } });
    const [orderItems, _] = await this.orderItemService.findAndCount({ where: { order: { learner: learner } } });
    const books = orderItems.map(orderItem => orderItem.book);
    return books;
  }

  @Get('/all-courses')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get courses' })
  @ApiResponse({
    status: 200,
    description: 'Courses retrieved',
    type: CourseDTO,
    isArray: true,
  })
  async getAllCourses(@Req() req: Request): Promise<CourseDTO[]> {
    const [courses, _] = await this.courseService.findAndCount({});
    return courses;
  }

  @Get('/my-courses')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get courses ordered by the user' })
  @ApiResponse({
    status: 200,
    description: 'Courses retrieved',
    type: CourseDTO,
    isArray: true,
  })
  async getMyCourses(@Req() req: Request): Promise<CourseDTO[]> {
    const user: any = req.user;
    const learner = await this.learnerService.findByFields({ where: { user: { id: user.id } } });
    const [orderItems, _] = await this.orderItemService.findAndCount({ where: { order: { learner: learner } } });
    const courses = orderItems.map(orderItem => orderItem.course);
    return courses;
  }

  @Get('/my-cart')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart found',
    type: CartItemDTO,
    isArray: true,
  })
  async getMyCart(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    const learner = await this.learnerService.findByFields({ where: { user: { id: user.id } } });
    const [cartItems, _] = await this.cartItemService.findAndCount({ where: { learner: { id: learner.id } } });

    const books = cartItems.filter(cartItem => cartItem.book !== null).map(cartItem => cartItem.book);
    const courses = cartItems.filter(cartItem => cartItem.course !== null).map(cartItem => cartItem.course);

    // Calculate the total price
    const totalPrice = cartItems.reduce((total, item) => {
      if (item.book) {
        return total + item.book.price;
      } else if (item.course) {
        return total + item.course.price;
      } else {
        return total;
      }
    }, 0);
    //TODO calculate price base on type

    return { books, courses, total: totalPrice };
  }
  @Get('/my-favorites')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get User Favorites' })
  @ApiResponse({
    status: 200,
    description: 'Favorites found',
    type: FavoriteDTO,
    isArray: true,
  })
  async getMyFavorites(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    const learner = await this.learnerService.findByFields({ where: { user: { id: user.id } } });
    const [favorites, _] = await this.favoriteService.findAndCount({ where: { learner: { id: learner.id } } });

    const books = favorites.filter(favorite => favorite.book !== null).map(favorite => favorite.book);
    const courses = favorites.filter(favorite => favorite.course !== null).map(favorite => favorite.course);

    return { books, courses };
  }

  @PostMethod('/toggle-favorite')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Toggle a favorite item' })
  @ApiResponse({
    status: 200,
    description: 'The favorite has been successfully toggled.',
  })
  async toggleFavorite(
    @Req() req: Request,
    @Body() favoriteToggleVM: FavoriteToggleVM,
  ): Promise<{
    isFavorite: boolean;
    type: EntityType;
    id: number;
  }> {
    const user: any = req.user;
    const learner = await this.learnerService.findByFields({ where: { user: { id: user.id } } });

    // Check if the item is already a favorite
    let existingFavorite;
    if (favoriteToggleVM.type === EntityType.BOOK) {
      existingFavorite = await this.favoriteService.findByFields({
        where: {
          learner: { id: learner.id },
          book: { id: favoriteToggleVM.id },
        },
      });
    } else if (favoriteToggleVM.type === EntityType.COURSE) {
      existingFavorite = await this.favoriteService.findByFields({
        where: {
          learner: { id: learner.id },
          course: { id: favoriteToggleVM.id },
        },
      });
    }

    let isFavorite = false;
    if (existingFavorite) {
      // If the item is already a favorite, remove it
      await this.favoriteService.deleteById(existingFavorite.id);
    } else {
      // If the item is not a favorite, add it
      const favoriteDTO = new FavoriteDTO();
      favoriteDTO.learner = learner;
      if (favoriteToggleVM.type === EntityType.BOOK) {
        favoriteDTO.book = await this.bookService.findById(favoriteToggleVM.id);
      } else if (favoriteToggleVM.type === EntityType.COURSE) {
        favoriteDTO.course = await this.courseService.findById(favoriteToggleVM.id);
      }
      await this.favoriteService.save(favoriteDTO);
      isFavorite = true;
    }

    // Return the status of the item (favorite or not), type of entity and its id
    return { isFavorite, type: favoriteToggleVM.type, id: favoriteToggleVM.id };
  }

  @Get('/my-orders')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get User Orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders found',
  })
  async getMyOrders(@Req() req: Request): Promise<any> {
    const user: any = req.user;
    const learner = await this.learnerService.findByFields({ where: { user: { id: user.id } } });
    return this.orderService.findAndCount({ where: { learner: { id: learner.id } } });
  }

  @Get('/my-book-borrows')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get User BookBorrows' })
  @ApiResponse({
    status: 200,
    description: 'Profile BookBorrows',
  })
  getMyBookBorrows(@Req() req: Request): any {
    const user: any = req.user;
    const learner = this.learnerService.findByFields({ where: { user: { id: user.id } } });
    return this.bookBorrowRequestService.findAndCount({ where: { learner: learner } });
  }

  @Get('/my-notifications')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get User Notifications' })
  @ApiResponse({
    status: 200,
    description: 'Notifications found',
  })
  getMyNotifications(@Req() req: Request): any {
    const user: any = req.user;
    return this.notificationService.findAndCount({ where: { userId: user.id } });
  }
}
