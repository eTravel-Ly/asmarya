import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { EntityType } from '../../../domain/enumeration/entity-type';

export class UpdateProgressVM {
  @ApiProperty({ description: 'The ID of the book or course', example: 1 })
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'The type of the entity (Book or Course)', enum: EntityType })
  @IsEnum(EntityType)
  @IsNotEmpty()
  type: EntityType;

  @ApiProperty({ description: 'The progress step', example: 1 })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  progressStep: number;
}
