import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateVehicleDto {
  @IsString()
  @ApiProperty({ description: 'License plate of the vehicle' })
  plate: string;

  @IsString()
  @ApiProperty({ description: 'Type of service of the vehicle' })
  service: string;
}
