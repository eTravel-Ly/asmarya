/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../../../domain/enumeration/gender';

/**
 * A EventSubscriptionDTO object.
 */
export class EventRegisterVM {
  @ApiProperty({ description: 'fullName field', required: false })
  fullName: string;

  @ApiProperty({ enum: Gender, description: 'gender enum field', required: false })
  gender: Gender;

  @ApiProperty({ description: 'birthDate field', required: false })
  birthDate: Date;

  @ApiProperty({ description: 'email field', required: false })
  email: string;

  @ApiProperty({ description: 'mobileNo field', required: false })
  mobileNo: string;

  @ApiProperty({ description: 'city field', required: false })
  city: string;

  @ApiProperty({ description: 'nationalityCode field', required: false })
  nationalityCode: string;

  @ApiProperty({ description: 'subscriberNotes field', required: false })
  subscriberNotes: string;

  @ApiProperty({ description: 'attachmentFile field', required: false })
  attachmentFile: any;

  attachmentFileContentType: string;

  @ApiProperty({ description: 'eventId field', required: true })
  eventId: number;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
