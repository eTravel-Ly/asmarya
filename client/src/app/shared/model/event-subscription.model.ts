import { IEvent } from 'app/shared/model/event.model';
import { ILearner } from 'app/shared/model/learner.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { SubscriptionStatus } from 'app/shared/model/enumerations/subscription-status.model';

export interface IEventSubscription {
  id?: number;
  fullName?: string | null;
  gender?: keyof typeof Gender | null;
  birthDate?: string | null;
  email?: string | null;
  mobileNo?: string | null;
  city?: string | null;
  nationalityCode?: string | null;
  subscriptionStatus?: keyof typeof SubscriptionStatus | null;
  results?: string | null;
  subscriberNotes?: string | null;
  notes?: string | null;
  subscriptionDate?: string | null;
  attachmentUrl?: string | null;
  attachmentFileContentType?: string | null;
  attachmentFile?: string | null;
  event?: IEvent | null;
  learner?: ILearner | null;
}

export const defaultValue: Readonly<IEventSubscription> = {};
