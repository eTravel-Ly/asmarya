/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';

/**
 * A LearnerDTO object.
 */
export class RequestOtpVm {
  @ApiProperty({ description: 'email field', required: true })
  email: string;
}
