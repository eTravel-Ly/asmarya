import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileVM {
  @ApiProperty({ description: 'First name of the user', required: false })
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user', required: false })
  lastName?: string;

  @ApiProperty({ description: 'Birth year of the user', required: false })
  birthYear?: number;

  @ApiProperty({ description: 'Email address', required: false })
  email?: string;

  @ApiProperty({ description: 'Mobile number', required: false })
  mobileNo?: string;

  @ApiProperty({ description: 'Nationality code', required: false })
  nationalityCode?: string;

  @ApiProperty({ description: 'City of residence', required: false })
  city?: string;

  @ApiProperty({ description: 'Address', required: false })
  address?: string;
}
