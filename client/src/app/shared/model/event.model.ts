import dayjs from 'dayjs';
import { EventType } from 'app/shared/model/enumerations/event-type.model';
import { ParticipationType } from 'app/shared/model/enumerations/participation-type.model';

export interface IEvent {
  id?: number;
  title?: string;
  organizer?: string | null;
  address?: string | null;
  description?: string | null;
  eventType?: keyof typeof EventType | null;
  participationType?: keyof typeof ParticipationType | null;
  eventStartDate?: dayjs.Dayjs | null;
  eventEndDate?: dayjs.Dayjs | null;
  applyStartDate?: dayjs.Dayjs | null;
  applyEndDate?: dayjs.Dayjs | null;
  abstractApplyEndDate?: dayjs.Dayjs | null;
  papersReplayDate?: dayjs.Dayjs | null;
  enrollmentEndDate?: dayjs.Dayjs | null;
  contactMobile?: string | null;
  contactWhatsApp?: string | null;
  contactWebsite?: string | null;
  contactEmail?: string | null;
  conditions?: string | null;
  notes?: string | null;
  coverImageFileContentType?: string | null;
  coverImageFile?: string | null;
  coverImageUrl?: string | null;
  isActive?: boolean | null;
}

export const defaultValue: Readonly<IEvent> = {
  isActive: false,
};
