import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './domain/entities/vehicle.entity';
import { VehicleService } from './application/services/vehicle.service';
import { VehicleController } from './presentation/vehicle.controller';
import { VehicleRepository } from './infrastructure/repository/vehicle.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehicleController],
  providers: [
    VehicleService,
    {
      provide: 'IVehicleRepository',
      useClass: VehicleRepository,
    },
  ],
  exports: [VehicleService],
})
export class VehicleModule {}
