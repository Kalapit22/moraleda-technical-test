import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  type: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  vehicleId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  clientId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  transmitterId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  projectId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
  organizationalUnitId: string;
}
