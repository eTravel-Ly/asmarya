import dayjs from 'dayjs';
import { ISheikh } from 'app/shared/model/sheikh.model';

export interface ICenter {
  id?: number;
  name?: string | null;
  address?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  managerName?: string | null;
  workingHours?: string | null;
  numberOfStudents?: number | null;
  numberOfTeachers?: number | null;
  establishmentDate?: dayjs.Dayjs | null;
  programsOffered?: string | null;
  description?: string | null;
  sheikhs?: ISheikh[] | null;
}

export const defaultValue: Readonly<ICenter> = {};
