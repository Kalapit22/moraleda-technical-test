import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { UpdatePermissionDto } from "../dto/update-permission.dto";
import { Permission } from "../../domain/permission.entity";
import { IPermissionRepository } from "../ports/permission.interface.repository";
import { DeleteResult } from "typeorm";


@Injectable()
export class PermissionService {
  constructor(
    @Inject('IPermissionRepository')
    private readonly permissionRepository: IPermissionRepository
  ) {}

  async findById(id: string): Promise<Permission | null> {
    const permission = await this.permissionRepository.findById(id);
    if (!permission) {
      throw new NotFoundException(`Permission with id ${id} not found`);
    }
    return permission;
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.findAll();
  }

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    return this.permissionRepository.create(createPermissionDto);
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    return this.permissionRepository.update(id, updatePermissionDto);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.permissionRepository.deleteById(id);
  }
}
