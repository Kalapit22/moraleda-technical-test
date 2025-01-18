// transfer.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Transfer } from '../../domain/entities/transfer.entity';
import { CreateTransferDto } from '../../application/dto/create-transfer.dto';
import { UpdateTransferDto } from '../../application/dto/update-transfer.dto';
import { ITransferRepository } from '../../application/ports/transfers-interface.repository';

// We also need the User entity to load user projects, org units
import { User } from 'src/modules/users/domain/entities/user.entity';
// Similarly for the other entities, so we can create references:
import { Vehicle } from 'src/modules/vehicles/domain/entities/vehicle.entity';
import { Project } from 'src/modules/projects/domain/entities/project.entity';
import { OrganizationalUnit } from 'src/modules/organizational_units/domain/entities/organizational_unit.entity';

@Injectable()
export class TransferRepository implements ITransferRepository {
  constructor(
    @InjectRepository(Transfer)
    private readonly repository: Repository<Transfer>,

    // Needed so we can load the user, and thus the user's projects/OUs
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findById(id: string): Promise<Transfer | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['vehicle', 'client', 'transmitter', 'project', 'organizationalUnit'],
    });
  }

  public async findAll(userId: string): Promise<Transfer[]> {
    // 1. Get the user with projects and OUs
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['projects', 'organizationalUnits'],
    });

    if (!user) {
      // Return empty or throw an exception
      return [];
    }

    // 2. Collect the user's project IDs and OU IDs
    const projectIds = user.project?.map((p) => p.id) || [];
    const ouIds = user.organizationalUnit?.map((ou) => ou.id) || [];

    if (!projectIds.length || !ouIds.length) {
      // The user has no projects or OUs associated => no transfers
      return [];
    }

    // 3. Filter by those IDs using a query builder
    return this.repository
      .createQueryBuilder('transfer')
      .leftJoinAndSelect('transfer.vehicle', 'vehicle')
      .leftJoinAndSelect('transfer.client', 'client')
      .leftJoinAndSelect('transfer.transmitter', 'transmitter')
      .leftJoinAndSelect('transfer.project', 'project')
      .leftJoinAndSelect('transfer.organizationalUnit', 'organizationalUnit')
      .where('project.id IN (:...projectIds)', { projectIds })
      .andWhere('organizationalUnit.id IN (:...ouIds)', { ouIds })
      .getMany();
  }

  public async create(dto: CreateTransferDto): Promise<Transfer> {
    // Instead of passing `dto` directly, we create an entity so TypeORM
    // understands the foreign keys:
    const transferEntity = this.repository.create({
      type: dto.type,
      vehicle: { id: dto.vehicleId } as Vehicle,
      client: { id: dto.clientId } as User,
      transmitter: { id: dto.transmitterId } as User,
      project: { id: dto.projectId } as Project,
      organizationalUnit: { id: dto.organizationalUnitId } as OrganizationalUnit,
    });
    return this.repository.save(transferEntity);
  }

  public async update(id: string, dto: UpdateTransferDto): Promise<Transfer> {
    // 1. Load existing
    const existing = await this.repository.findOne({
      where: { id },
      relations: ['vehicle', 'client', 'transmitter', 'project', 'organizationalUnit'],
    });
    if (!existing) {
      throw new NotFoundException(`Transfer with ID ${id} not found`);
    }

    // 2. Merge updated fields
    if (dto.type !== undefined) {
      existing.type = dto.type;
    }
    if (dto.vehicleId) {
      existing.vehicle = { id: dto.vehicleId } as Vehicle;
    }
    if (dto.clientId) {
      existing.client = { id: dto.clientId } as User;
    }
    if (dto.transmitterId) {
      existing.transmitter = { id: dto.transmitterId } as User;
    }
    if (dto.projectId) {
      existing.project = { id: dto.projectId } as Project;
    }
    if (dto.organizationalUnitId) {
      existing.organizationalUnit = { id: dto.organizationalUnitId } as OrganizationalUnit;
    }

    // 3. Save
    return this.repository.save(existing);
  }

  public async deleteById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
