import { IOrder } from 'app/shared/model/order.model';
import { IBook } from 'app/shared/model/book.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IOrderItem {
  id?: number;
  total?: number | null;
  discount?: number | null;
  order?: IOrder | null;
  book?: IBook | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
