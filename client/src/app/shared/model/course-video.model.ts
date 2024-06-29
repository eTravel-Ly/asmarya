import { ICourse } from 'app/shared/model/course.model';

export interface ICourseVideo {
  id?: number;
  title?: string;
  details?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  fileUrl?: string | null;
  durationInSeconds?: number | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<ICourseVideo> = {};
