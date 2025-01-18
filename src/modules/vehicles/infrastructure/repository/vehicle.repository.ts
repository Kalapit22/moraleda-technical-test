import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Vehicle } from '../../domain/entities/vehicle.entity';
import { CreateVehicleDto } from '../../application/dto/create-vehicle.dto';
import { UpdateVehicleDto } from '../../application/dto/update-vehicle.dto';
import { IVehicleRepository } from '../../application/ports/vehicle.interface.repository';

@Injectable()
export class VehicleRepository implements IVehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private readonly repository: Repository<Vehicle>,
  ) {}

  public async findById(id: string): Promise<Vehicle | null> {
    return this.repository.findOne({ where: { id } });
  }

  public async findByPlate(plate: string): Promise<Vehicle | null> {
    return this.repository.findOne({ where: { plate } });
  }

  public async findAll(): Promise<Vehicle[]> {
    return this.repository.find();
  }

  public async create(vehicle: CreateVehicleDto): Promise<Vehicle> {
    return this.repository.save(vehicle);
  }

  public async update(id: string, vehicle: UpdateVehicleDto): Promise<Vehicle> {
    await this.repository.update(id, vehicle);
    return this.repository.findOne({ where: { id } });
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
