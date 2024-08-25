import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { EntityType } from '../../../domain/enumeration/entity-type';

export class AddCommentVM {
  @IsEnum(EntityType)
  @ApiProperty({ enum: EntityType, description: 'Type of the entity (course or video)' })
  entityType: EntityType;

  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the course or video' })
  id: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'Comment text' })
  comment: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({ description: 'Rating stars (1 to 5)' })
  stars: number;
}
