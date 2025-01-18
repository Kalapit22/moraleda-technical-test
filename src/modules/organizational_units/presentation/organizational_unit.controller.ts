import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { CreateOrganizationalUnitDto } from "../application/dto/create-organizational_unit.dto";
import { UpdateOrganizationalUnitDto } from "../application/dto/update-organizational_unit.dto";
import { OrganizationalUnitService } from "../application/services/organizational_unit.service";

@ApiTags('organizational_units')
@Controller('organizational_units')
export class OrganizationalUnitController {
  constructor(private readonly organizationalUnitService: OrganizationalUnitService) {}

  @ApiOperation({ summary: 'Get all organizational units' })
  @Get()
  async findAll() {
    return this.organizationalUnitService.findAll();
  }

  @ApiOperation({ summary: 'Get an organizational unit by id' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.organizationalUnitService.findById(id);
  }

  @ApiOperation({ summary: 'Create an organizational unit' })
  @Post()
  async create(@Body() createDto: CreateOrganizationalUnitDto) {
    return this.organizationalUnitService.create(createDto);
  }

  @ApiOperation({ summary: 'Update an organizational unit' })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateOrganizationalUnitDto) {
    return this.organizationalUnitService.update(id, updateDto);
  }

  @ApiOperation({ summary: 'Delete an organizational unit' })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.organizationalUnitService.deleteById(id);
  }
}
