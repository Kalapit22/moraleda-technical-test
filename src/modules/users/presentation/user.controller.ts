import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../application/dto/create-user.dto";
import { UpdateUserDto } from "../application/dto/update-user.dto";
import { UserService } from "../application/services/user.service";



@ApiTags('users')
@Controller('users')
export class UserController {


    constructor(
        private readonly userService: UserService
    ){}


    @ApiOperation({summary: "Get all users"})
    @Get('')
    public async findAll(){
        return this.userService.findAll();
    }

    @ApiOperation({summary: "Get user by id"})    
    @ApiParam({name: 'id',required:true})
    @Get(':id')
    public async findById(@Param('id') id:string) {
        return this.userService.findById(id);
    }

    @ApiOperation({summary: "Get an user by email"})
    @ApiParam({name: 'id',required:true})
    @Get('email/:email')
    public async findByEmail(@Param('email') email:string){
        return this.userService.findByEmail(email);
    }

    @ApiOperation({summary: "Create an user"})
    @Post('')
    public async create(@Body() createUserDto:CreateUserDto){
        return this.userService.create(createUserDto);
    }

    @ApiOperation({summary: "Update an user"})
    @ApiParam({name: 'id',required:true})
    @Patch(':id')
    public async update(@Param('id') id:string, @Body() updateUserDto:UpdateUserDto) {
        return this.userService.update(id,updateUserDto);
    }

    @ApiOperation({summary: "Delete an user"})
    @ApiParam({name: 'id',required:true})
    @Delete(':id')
    public async delete(@Param('id') id:string){
        return this.userService.deleteUserById(id);
    }








}