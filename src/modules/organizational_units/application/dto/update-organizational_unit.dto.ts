import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
} from 'class-validator';

export class UpdateOrganizationalUnitDto {
  @ApiPropertyOptional({
    description: 'Updated name of the organizational unit',
    example: 'Finance and Accounting',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Updated project ID if the OU is moved to another project',
    example: '4d29e1fc-8b2e-4509-9ba8-1a2b07b378c9',
  })
  @IsOptional()
  @IsUUID()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Array of user IDs to associate or re-associate with this OU',
    type: [String],
    example: ['12dfdfc6-6a80-4f5b-a0d5-123456789abc'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID(undefined, { each: true })
  userIds?: string[];
}
