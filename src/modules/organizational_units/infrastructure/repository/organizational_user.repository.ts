import { IOrganizationalUnitRepository } from "../../application/ports/organizational_units.interface.repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { CreateOrganizationalUnitDto } from "../../application/dto/create-organizational_unit.dto";
import { UpdateOrganizationalUnitDto } from "../../application/dto/update-organizational_unit.dto";
import { OrganizationalUnit } from "../../domain/entities/organizational_unit.entity";
import { IProjectRepository } from "src/modules/projects/application/ports/project.interface.repository";


@Injectable()
export class OrganizationalUnitRepository implements IOrganizationalUnitRepository {
  constructor(
    @InjectRepository(OrganizationalUnit)
    private readonly repository: Repository<OrganizationalUnit>,
  ) {}

  async findById(id: string): Promise<OrganizationalUnit | null> {
    return this.repository.findOne({ where: { id }, relations: ['project', 'user'] });
  }

  async findAll(): Promise<OrganizationalUnit[]> {
    return this.repository.find({ relations: ['project', 'user'] });
  }

  async create(createDto: CreateOrganizationalUnitDto): Promise<OrganizationalUnit> {
    const unit = this.repository.create(createDto);
    return this.repository.save(unit);
  }

  async update(id: string, updateDto: UpdateOrganizationalUnitDto): Promise<OrganizationalUnit> {
    await this.repository.update(id, updateDto);
    return this.repository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
