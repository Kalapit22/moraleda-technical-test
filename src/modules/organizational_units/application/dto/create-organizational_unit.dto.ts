import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateOrganizationalUnitDto {
  @ApiProperty({
    description: 'Name of the organizational unit',
    example: 'Finance Department',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The ID of the project this organizational unit belongs to',
    example: '8c6c2fbc-2b1a-49ec-b252-13bdf3da29b2',
  })
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @ApiPropertyOptional({
    description: 'Array of user IDs to associate with this new OU',
    type: [String],
    example: ['12dfdfc6-6a80-4f5b-a0d5-123456789abc'],
  })
  @IsOptional()
  @IsArray()
  @IsUUID()
  userId?: string;
}
