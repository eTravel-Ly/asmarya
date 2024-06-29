import dayjs from 'dayjs';

export interface IActivation {
  id?: number;
  mobileNo?: string | null;
  email?: string | null;
  code?: string | null;
  sentOn?: dayjs.Dayjs | null;
  validUntil?: dayjs.Dayjs | null;
  isUsed?: boolean | null;
}

export const defaultValue: Readonly<IActivation> = {
  isUsed: false,
};
