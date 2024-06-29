import dayjs from 'dayjs';
import { ICategory } from 'app/shared/model/category.model';
import { BookGenre } from 'app/shared/model/enumerations/book-genre.model';
import { Language } from 'app/shared/model/enumerations/language.model';
import { BookAvailability } from 'app/shared/model/enumerations/book-availability.model';

export interface IBook {
  id?: number;
  title?: string;
  author?: string;
  publicationDate?: dayjs.Dayjs | null;
  isbn?: string | null;
  description?: string | null;
  genre?: keyof typeof BookGenre | null;
  publisher?: string | null;
  pageCount?: number | null;
  language?: keyof typeof Language | null;
  coverImageFileContentType?: string | null;
  coverImageFile?: string | null;
  coverImageUrl?: string | null;
  bookFileContentType?: string | null;
  bookFile?: string | null;
  bookUrl?: string | null;
  price?: number | null;
  studentsPrice?: number | null;
  numberOfBooksAvailable?: number | null;
  keywords?: string | null;
  bookAvailability?: keyof typeof BookAvailability | null;
  categories?: ICategory[] | null;
}

export const defaultValue: Readonly<IBook> = {};
