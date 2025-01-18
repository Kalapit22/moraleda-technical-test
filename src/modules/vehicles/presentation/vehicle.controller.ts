import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { VehicleService } from '../application/services/vehicle.service';
import { CreateVehicleDto } from '../application/dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../application/dto/update-vehicle.dto';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @ApiOperation({ summary: 'Get all vehicles' })
  @Get()
  public async findAll() {
    return this.vehicleService.findAll();
  }

  @ApiOperation({ summary: 'Get vehicle by ID' })
  @ApiParam({ name: 'id', required: true })
  @Get(':id')
  public async findById(@Param('id') id: string) {
    return this.vehicleService.findById(id);
  }

  @ApiOperation({ summary: 'Get vehicle by plate' })
  @ApiParam({ name: 'plate', required: true })
  @Get('plate/:plate')
  public async findByPlate(@Param('plate') plate: string) {
    return this.vehicleService.findByPlate(plate);
  }

  @ApiOperation({ summary: 'Create a new vehicle' })
  @Post()
  public async create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiParam({ name: 'id', required: true })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleDto,
  ) {
    return this.vehicleService.update(id, updateVehicleDto);
  }

  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiParam({ name: 'id', required: true })
  @Delete(':id')
  public async delete(@Param('id') id: string) {
    return this.vehicleService.deleteById(id);
  }
}
