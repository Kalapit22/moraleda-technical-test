import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";



export class UpdateUserDto {


    @IsString()
    @ApiProperty()
    @IsOptional()
    username?:string;

    @IsEmail()
    @IsOptional()
    email?:string;

    @IsString()
    @IsOptional()
    password?:string;

}