import activation from 'app/entities/activation/activation.reducer';
import appSetting from 'app/entities/app-setting/app-setting.reducer';
import book from 'app/entities/book/book.reducer';
import bookBorrowRequest from 'app/entities/book-borrow-request/book-borrow-request.reducer';
import cartItem from 'app/entities/cart-item/cart-item.reducer';
import category from 'app/entities/category/category.reducer';
import comment from 'app/entities/comment/comment.reducer';
import course from 'app/entities/course/course.reducer';
import courseVideo from 'app/entities/course-video/course-video.reducer';
import favorite from 'app/entities/favorite/favorite.reducer';
import learner from 'app/entities/learner/learner.reducer';
import notification from 'app/entities/notification/notification.reducer';
import order from 'app/entities/order/order.reducer';
import orderItem from 'app/entities/order-item/order-item.reducer';
import paymentMethod from 'app/entities/payment-method/payment-method.reducer';
import slider from 'app/entities/slider/slider.reducer';
import event from 'app/entities/event/event.reducer';
import eventSubscription from 'app/entities/event-subscription/event-subscription.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  activation,
  appSetting,
  book,
  bookBorrowRequest,
  cartItem,
  category,
  comment,
  course,
  courseVideo,
  favorite,
  learner,
  notification,
  order,
  orderItem,
  paymentMethod,
  slider,
  event,
  eventSubscription,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
