import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTransferDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  type?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  vehicleId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  clientId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  transmitterId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  projectId?: string;

  @IsOptional()
  @IsUUID()
  @ApiProperty()
  organizationalUnitId?: string;
}
