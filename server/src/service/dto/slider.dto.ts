/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A SliderDTO object.
 */
export class SliderDTO extends BaseDTO {
  @ApiProperty({ description: 'detailsAr field', required: false })
  detailsAr: string;

  @ApiProperty({ description: 'detailsEn field', required: false })
  detailsEn: string;

  @ApiProperty({ description: 'menuOrder field', required: false })
  menuOrder: number;

  @ApiProperty({ description: 'imageFileUrl field', required: false })
  imageFileUrl: string;

  @ApiProperty({ description: 'imageFile field', required: false })
  imageFile: any;

  imageFileContentType: string;
  @ApiProperty({ description: 'link field', required: false })
  link: string;

  @ApiProperty({ description: 'notes field', required: false })
  notes: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
