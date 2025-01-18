import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "../application/dto/create-role.dto";
import { UpdateRoleDto } from "../application/dto/update-role.dto";
import { RoleService } from "../application/services/role.service";

@ApiTags('roles')
@Controller('roles')
export class RoleController {

     constructor(
            private readonly roleService: RoleService
        ){}
    
        @ApiOperation({summary: "Get all roles"})
        @Get('')
        public async findAll(){
            return this.roleService.findAll();
        }
    
        @ApiOperation({summary: "Get role by id"})    
        @ApiParam({name: 'id',required:true})
        @Get(':id')
        public async findById(@Param('id') id:string) {
            return this.roleService.findById(id);
        }
    
        @ApiOperation({summary: "Get an role by name"})
        @Get('name/:name')
        public async findByName(@Param('name') email:string){
            return this.roleService.findByName(email);
        }
    
        @ApiOperation({summary: "Create an role"})
        @Post('')
        public async create(@Body() createRoleDto:CreateRoleDto){
            return this.roleService.create(createRoleDto);
        }
    
        @ApiOperation({summary: "Update an role"})
        @ApiParam({name: 'id',required:true})
        @Patch(':id')
        public async update(@Param('id') id:string, @Body() updateRoleDto:UpdateRoleDto) {
            return this.roleService.update(id,updateRoleDto);
        }
    
        @ApiOperation({summary: "Delete an role"})
        @ApiParam({name: 'id',required:true})
        @Delete(':id')
        public async delete(@Param('id') id:string){
            return this.roleService.deleteRoleById(id);
        }




}
