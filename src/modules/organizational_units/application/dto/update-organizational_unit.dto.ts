import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
} from 'class-validator';

export class UpdateOrganizationalUnitDto {
  
  @ApiProperty()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID(undefined)
  userId?: string;
}
