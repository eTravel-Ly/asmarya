import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Activation from './activation';
import AppSetting from './app-setting';
import Book from './book';
import BookBorrowRequest from './book-borrow-request';
import CartItem from './cart-item';
import Category from './category';
import Comment from './comment';
import Course from './course';
import CourseVideo from './course-video';
import Favorite from './favorite';
import Learner from './learner';
import Notification from './notification';
import Order from './order';
import OrderItem from './order-item';
import PaymentMethod from './payment-method';
import Slider from './slider';
import Dashboard from './dashboard';
import Event from './event';
import EventSubscription from './event-subscription';
import Sheikh from './sheikh';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="dashboard/*" element={<Dashboard/>}/>
        <Route path="activation/*" element={<Activation />} />
        <Route path="app-setting/*" element={<AppSetting />} />
        <Route path="book/*" element={<Book />} />
        <Route path="book-borrow-request/*" element={<BookBorrowRequest />} />
        <Route path="cart-item/*" element={<CartItem />} />
        <Route path="category/*" element={<Category />} />
        <Route path="comment/*" element={<Comment />} />
        <Route path="course/*" element={<Course />} />
        <Route path="course-video/*" element={<CourseVideo />} />
        <Route path="favorite/*" element={<Favorite />} />
        <Route path="learner/*" element={<Learner />} />
        <Route path="notification/*" element={<Notification />} />
        <Route path="order/*" element={<Order />} />
        <Route path="order-item/*" element={<OrderItem />} />
        <Route path="payment-method/*" element={<PaymentMethod />} />
        <Route path="slider/*" element={<Slider />} />
        <Route path="event/*" element={<Event />} />
        <Route path="event-subscription/*" element={<EventSubscription />} />
        <Route path="sheikh/*" element={<Sheikh />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
