import { IUser } from 'app/shared/model/user.model';
import { LearnerType } from 'app/shared/model/enumerations/learner-type.model';

export interface ILearner {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  birthYear?: number | null;
  email?: string | null;
  mobileNo?: string | null;
  googleId?: string | null;
  facebookId?: string | null;
  appleId?: string | null;
  isBanned?: boolean | null;
  verifiedByEmail?: boolean | null;
  verifiedByMobileNo?: boolean | null;
  imageFileContentType?: string | null;
  imageFile?: string | null;
  imageFileUrl?: string | null;
  nationalityCode?: string | null;
  city?: string | null;
  address?: string | null;
  learnerType?: keyof typeof LearnerType | null;
  studentId?: string | null;
  notes?: string | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<ILearner> = {
  isBanned: false,
  verifiedByEmail: false,
  verifiedByMobileNo: false,
};
