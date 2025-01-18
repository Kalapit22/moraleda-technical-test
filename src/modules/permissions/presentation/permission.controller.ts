import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { PermissionService } from "../application/services/permission.service";
import { CreatePermissionDto } from "../application/dto/create-permission.dto";
import { UpdatePermissionDto } from "../application/dto/update-permission.dto";

@ApiTags('permissions')
@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Get all permissions' })
  @Get()
  async findAll() {
    return this.permissionService.findAll();
  }

  @ApiOperation({ summary: 'Get a permission by id' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.permissionService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new permission' })
  @Post()
  async create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Update a permission' })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Delete a permission' })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.permissionService.deleteById(id);
  }
}
