import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {IsNotEmpty,IsString,IsUUID,IsOptional,IsArray,
} from 'class-validator';

export class CreateOrganizationalUnitDto {

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userId?: string;
}
