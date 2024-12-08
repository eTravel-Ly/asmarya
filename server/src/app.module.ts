import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './module/auth.module';
import { ormConfig } from './orm.config';
import { config } from './config';
import { ActivationModule } from './module/activation.module';
import { AppSettingModule } from './module/app-setting.module';
import { BookModule } from './module/book.module';
import { BookBorrowRequestModule } from './module/book-borrow-request.module';
import { CartItemModule } from './module/cart-item.module';
import { CategoryModule } from './module/category.module';
import { CommentModule } from './module/comment.module';
import { CourseModule } from './module/course.module';
import { CourseVideoModule } from './module/course-video.module';
import { FavoriteModule } from './module/favorite.module';
import { LearnerModule } from './module/learner.module';
import { NotificationModule } from './module/notification.module';
import { OrderModule } from './module/order.module';
import { OrderItemModule } from './module/order-item.module';
import { PaymentMethodModule } from './module/payment-method.module';
import { SliderModule } from './module/slider.module';
import { WebsiteModule } from './module/website.module';
import { EventModule } from './module/event.module';
import { EventSubscriptionModule } from './module/event-subscription.module';
import { SheikhModule } from './module/sheikh.module';
// jhipster-needle-add-entity-module-to-main-import - JHipster will import entity modules here, do not remove
// jhipster-needle-add-controller-module-to-main-import - JHipster will import controller modules here, do not remove
// jhipster-needle-add-service-module-to-main-import - JHipster will import service modules here, do not remove

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    ServeStaticModule.forRoot({
      rootPath: config.getClientPath(),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'network.com.ly',
        auth: {
          user: 'otp@network.com.ly',
          pass: 'jtw7[tEkV(YBbn',
        },
      },
    }),
    AuthModule,
    ActivationModule,
    AppSettingModule,
    BookModule,
    BookBorrowRequestModule,
    CartItemModule,
    CategoryModule,
    CommentModule,
    CourseModule,
    CourseVideoModule,
    EventModule,
    EventSubscriptionModule,
    FavoriteModule,
    LearnerModule,
    NotificationModule,
    OrderModule,
    OrderItemModule,
    PaymentMethodModule,
    SliderModule,
    WebsiteModule,
    SheikhModule,
    // jhipster-needle-add-entity-module-to-main - JHipster will add entity modules here, do not remove
  ],
  controllers: [
    // jhipster-needle-add-controller-module-to-main - JHipster will add controller modules here, do not remove
  ],
  providers: [
    // jhipster-needle-add-service-module-to-main - JHipster will add service modules here, do not remove
  ],
})
export class AppModule {}
