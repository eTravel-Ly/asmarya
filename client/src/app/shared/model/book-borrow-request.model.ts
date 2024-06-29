import dayjs from 'dayjs';
import { IBook } from 'app/shared/model/book.model';
import { ILearner } from 'app/shared/model/learner.model';
import { BookBorrowRequestStatus } from 'app/shared/model/enumerations/book-borrow-request-status.model';

export interface IBookBorrowRequest {
  id?: number;
  requestDate?: dayjs.Dayjs | null;
  collectDate?: dayjs.Dayjs | null;
  returnDate?: dayjs.Dayjs | null;
  bookBorrowRequestStatus?: keyof typeof BookBorrowRequestStatus | null;
  book?: IBook | null;
  learner?: ILearner | null;
}

export const defaultValue: Readonly<IBookBorrowRequest> = {};
