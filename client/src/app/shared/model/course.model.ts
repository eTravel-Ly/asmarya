import { ICategory } from 'app/shared/model/category.model';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface ICourse {
  id?: number;
  title?: string;
  description?: string | null;
  language?: keyof typeof Language | null;
  coverImageFileContentType?: string | null;
  coverImageFile?: string | null;
  coverImageUrl?: string | null;
  price?: number | null;
  studentsPrice?: number | null;
  keywords?: string | null;
  categories?: ICategory[] | null;
}

export const defaultValue: Readonly<ICourse> = {};
