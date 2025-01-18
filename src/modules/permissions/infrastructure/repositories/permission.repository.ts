import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreatePermissionDto } from "../../application/dto/create-permission.dto";
import { UpdatePermissionDto } from "../../application/dto/update-permission.dto";
import { IPermissionRepository } from "../../application/ports/permission.interface.repository";
import { Permission } from "../../domain/permission.entity";

@Injectable()
export class PermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(Permission)
    private readonly repository: Repository<Permission>
  ) {}

  async findById(id: string): Promise<Permission | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Permission[]> {
    return this.repository.find();
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const permission = this.repository.create(createPermissionDto);
    return this.repository.save(permission);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    await this.repository.update(id, updatePermissionDto);
    return this.repository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
