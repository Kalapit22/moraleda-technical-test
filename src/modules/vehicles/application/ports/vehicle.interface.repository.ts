import { Vehicle } from '../../domain/entities/vehicle.entity';
import { CreateVehicleDto } from '../dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../dto/update-vehicle.dto';
import { DeleteResult } from 'typeorm';

export interface IVehicleRepository {
  findById(id: string): Promise<Vehicle | null>;
  findByPlate(plate: string): Promise<Vehicle | null>;
  findAll(): Promise<Vehicle[]>;
  create(vehicle: CreateVehicleDto): Promise<Vehicle>;
  update(id: string, vehicle: UpdateVehicleDto): Promise<Vehicle>;
  deleteById(id: string): Promise<DeleteResult>;
}
