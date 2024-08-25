import { Module } from '@nestjs/common';
import { WebsiteController } from '../web/rest/website.controller';
import { LearnerModule } from './learner.module';
import { ActivationModule } from './activation.module';
import { OrderModule } from './order.module';
import { OrderItemModule } from './order-item.module';
import { CartItemModule } from './cart-item.module';
import { FavoriteModule } from './favorite.module';
import { BookBorrowRequestModule } from './book-borrow-request.module';
import { NotificationModule } from './notification.module';
import { SliderModule } from './slider.module';
import { CommentModule } from './comment.module';
import { BookModule } from './book.module';
import { CourseModule } from './course.module';
import { CourseVideoModule } from './course-video.module';
import { PaymentMethodModule } from './payment-method.module';
import { EventModule } from './event.module';
import { EventSubscriptionModule } from './event-subscription.module';

@Module({
  imports: [
    LearnerModule,
    ActivationModule,
    OrderModule,
    OrderItemModule,
    CartItemModule,
    FavoriteModule,
    BookBorrowRequestModule,
    NotificationModule,
    SliderModule,
    CommentModule,
    BookModule,
    CourseModule,
    CourseVideoModule,
    PaymentMethodModule,
    EventModule,
    EventSubscriptionModule,
  ],
  controllers: [WebsiteController],
  providers: [],
  exports: [],
})
export class WebsiteModule {}
