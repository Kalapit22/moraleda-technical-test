import { APP_INTERCEPTOR } from "@nestjs/core";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";


export class CreateUserDto {


    @IsString()
    @ApiProperty()
    username:string;

    @IsEmail()
    @ApiProperty()
    email:string;

    @IsString()
    @ApiProperty()
    password_hash:string;
}