import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateVehicleDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'License plate of the vehicle (optional)' })
  plate?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Type of service of the vehicle (optional)' })
  service?: string;
}
