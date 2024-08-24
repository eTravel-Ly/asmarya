/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { EventType } from '../../domain/enumeration/event-type';
import { ParticipationType } from '../../domain/enumeration/participation-type';
import { BaseDTO } from './base.dto';

/**
 * A EventDTO object.
 */
export class EventDTO extends BaseDTO {
  @IsNotEmpty()
  @ApiProperty({ description: 'title field' })
  title: string;

  @ApiProperty({ description: 'organizer field', required: false })
  organizer: string;

  @ApiProperty({ description: 'address field', required: false })
  address: string;

  @ApiProperty({ description: 'description field', required: false })
  description: string;

  @ApiProperty({ enum: EventType, description: 'eventType enum field', required: false })
  eventType: EventType;

  @ApiProperty({ enum: ParticipationType, description: 'participationType enum field', required: false })
  participationType: ParticipationType;

  @ApiProperty({ description: 'eventStartDate field', required: false })
  eventStartDate: any;

  @ApiProperty({ description: 'eventEndDate field', required: false })
  eventEndDate: any;

  @ApiProperty({ description: 'applyStartDate field', required: false })
  applyStartDate: any;

  @ApiProperty({ description: 'applyEndDate field', required: false })
  applyEndDate: any;

  @ApiProperty({ description: 'abstractApplyEndDate field', required: false })
  abstractApplyEndDate: any;

  @ApiProperty({ description: 'papersReplayDate field', required: false })
  papersReplayDate: any;

  @ApiProperty({ description: 'enrollmentEndDate field', required: false })
  enrollmentEndDate: any;

  @ApiProperty({ description: 'contactMobile field', required: false })
  contactMobile: string;

  @ApiProperty({ description: 'contactWhatsApp field', required: false })
  contactWhatsApp: string;

  @ApiProperty({ description: 'contactWebsite field', required: false })
  contactWebsite: string;

  @ApiProperty({ description: 'contactEmail field', required: false })
  contactEmail: string;

  @ApiProperty({ description: 'conditions field', required: false })
  conditions: string;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  @ApiProperty({ description: 'coverImageFile field', required: false })
  coverImageFile: any;

  coverImageFileContentType: string;
  @ApiProperty({ description: 'coverImageUrl field', required: false })
  coverImageUrl: string;

  @ApiProperty({ description: 'isActive field', required: false })
  isActive: boolean;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
