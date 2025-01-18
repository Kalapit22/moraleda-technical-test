import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProjectDto {
  @IsString()
  @ApiProperty({ description: 'Name of the project' })
  name: string;

  @IsString()
  @ApiProperty({ description: 'Description of the project' })
  description: string;
}
