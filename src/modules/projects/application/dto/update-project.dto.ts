import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional } from "class-validator";

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Name of the project (optional)' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Description of the project (optional)' })
  description?: string;


  @IsString()
  @ApiProperty()
  userId:string;

  @IsString()
  @ApiProperty()
  organizationalUnitId:string;
}
