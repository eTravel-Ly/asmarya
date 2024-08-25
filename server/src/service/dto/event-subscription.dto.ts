/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../domain/enumeration/gender';
import { SubscriptionStatus } from '../../domain/enumeration/subscription-status';
import { BaseDTO } from './base.dto';

import { EventDTO } from './event.dto';
import { LearnerDTO } from './learner.dto';

/**
 * A EventSubscriptionDTO object.
 */
export class EventSubscriptionDTO extends BaseDTO {
  @ApiProperty({ description: 'fullName field', required: false })
  fullName: string;

  @ApiProperty({ enum: Gender, description: 'gender enum field', required: false })
  gender: Gender;

  @ApiProperty({ description: 'birthDate field', required: false })
  birthDate: string;

  @ApiProperty({ description: 'email field', required: false })
  email: string;

  @ApiProperty({ description: 'mobileNo field', required: false })
  mobileNo: string;

  @ApiProperty({ description: 'city field', required: false })
  city: string;

  @ApiProperty({ description: 'nationalityCode field', required: false })
  nationalityCode: string;

  @ApiProperty({ enum: SubscriptionStatus, description: 'subscriptionStatus enum field', required: false })
  subscriptionStatus: SubscriptionStatus;

  @ApiProperty({ description: 'results field', required: false })
  results: string;

  @ApiProperty({ description: 'subscriberNotes field', required: false })
  subscriberNotes: string;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  @ApiProperty({ description: 'subscriptionDate field', required: false })
  subscriptionDate: string;

  @ApiProperty({ description: 'attachmentUrl field', required: false })
  attachmentUrl: string;

  @ApiProperty({ description: 'attachmentFile field', required: false })
  attachmentFile: any;

  attachmentFileContentType: string;

  @ApiProperty({ type: () => EventDTO, description: 'event relationship' })
  event: EventDTO;

  @ApiProperty({ type: () => LearnerDTO, description: 'learner relationship' })
  learner: LearnerDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
