import { Injectable, Inject } from '@nestjs/common';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { DeleteResult } from 'typeorm';
import { IVehicleRepository } from '../ports/vehicle.interface.repository';

@Injectable()
export class VehicleService {
  constructor(
    @Inject('IVehicleRepository')
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  public async findById(id: string): Promise<Vehicle | null> {
    return this.vehicleRepository.findById(id);
  }

  public async findByPlate(plate: string): Promise<Vehicle | null> {
    return this.vehicleRepository.findByPlate(plate);
  }

  public async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.findAll();
  }

  public async create(createVehicleDto: CreateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.create(createVehicleDto);
  }

  public async update(id: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    return this.vehicleRepository.update(id, updateVehicleDto);
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.vehicleRepository.deleteById(id);
  }
}
