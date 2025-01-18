import { DeleteResult } from "typeorm";
import { Permission } from "../../domain/permission.entity";
import { CreatePermissionDto } from "../dto/create-permission.dto";
import { UpdatePermissionDto } from "../dto/update-permission.dto";

export interface IPermissionRepository {
  findById(id: string): Promise<Permission | null>;
  findAll(): Promise<Permission[]>;
  create(permission: CreatePermissionDto): Promise<Permission>;
  update(id: string, permission: UpdatePermissionDto): Promise<Permission>;
  deleteById(id: string): Promise<DeleteResult>;
}
