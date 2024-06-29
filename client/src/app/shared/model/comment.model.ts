import { ILearner } from 'app/shared/model/learner.model';
import { IBook } from 'app/shared/model/book.model';
import { ICourse } from 'app/shared/model/course.model';

export interface IComment {
  id?: number;
  details?: string | null;
  likesCount?: number | null;
  dislikesCount?: number | null;
  learner?: ILearner | null;
  book?: IBook | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<IComment> = {};
