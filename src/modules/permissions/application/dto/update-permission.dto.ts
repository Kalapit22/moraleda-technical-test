import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdatePermissionDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Name of the permission (optional)' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Description of the permission (optional)' })
  description?: string;
}
