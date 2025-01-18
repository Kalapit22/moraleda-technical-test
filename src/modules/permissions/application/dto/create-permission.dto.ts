import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePermissionDto {
  @IsString()
  @ApiProperty({ description: 'Name of the permission' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Description of the permission' })
  description: string;
}
