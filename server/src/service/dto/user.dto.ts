import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { BaseDTO } from './base.dto';

/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
  @ApiProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'MyUser', description: 'User first name', required: false })
  firstName?: string;

  @ApiProperty({ example: 'MyUser', description: 'User last name', required: false })
  lastName?: string;

  @ApiProperty({ example: 'myuser@localhost.it', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'true', description: 'User activation', required: false })
  activated?: boolean;

  @ApiProperty({ example: 'en', description: 'User language', required: false })
  langKey?: string;

  @ApiProperty({
    isArray: true,
    enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_INTERNAL_STUDENT', 'ROLE_EXTERNAL_STUDENT', 'ROLE_INSTRUCTOR', 'ROLE_PUBLIC', 'ROLE_ANONYMOUS'],
    description: 'Array of permissions',
    required: false,
  })
  authorities?: any[];

  @Exclude()
  @ApiProperty({ example: 'myuser', description: 'User password' })
  password: string;

  @ApiProperty({ example: 'http://my-image-url', description: 'Image url', required: false })
  imageUrl?: string;

  activationKey?: string;

  resetKey?: string;

  resetDate?: Date;
}
