import dayjs from 'dayjs';
import { IUser } from 'app/shared/model/user.model';

export interface ISheikh {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: dayjs.Dayjs | null;
  phoneNumber?: string | null;
  email?: string | null;
  notes?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<ISheikh> = {};
