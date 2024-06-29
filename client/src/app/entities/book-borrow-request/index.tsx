import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BookBorrowRequest from './book-borrow-request';
import BookBorrowRequestDetail from './book-borrow-request-detail';
import BookBorrowRequestUpdate from './book-borrow-request-update';
import BookBorrowRequestDeleteDialog from './book-borrow-request-delete-dialog';

const BookBorrowRequestRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BookBorrowRequest />} />
    <Route path="new" element={<BookBorrowRequestUpdate />} />
    <Route path=":id">
      <Route index element={<BookBorrowRequestDetail />} />
      <Route path="edit" element={<BookBorrowRequestUpdate />} />
      <Route path="delete" element={<BookBorrowRequestDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BookBorrowRequestRoutes;
