import { Inject, Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { Role } from "../../domain/entities/role.entity";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { IRoleRepository } from "../ports/role.interface.repository";


@Injectable()
export class RoleService {

    constructor(
        @Inject('IRoleRepository')
        private readonly roleRepository: IRoleRepository
    ){}


     public async findById(id: string): Promise<Role | null> {
            return this.roleRepository.findById(id);
        }
        public async findByName(name: string): Promise<Role | null> {
            return this.roleRepository.findByName(name);
        }
        public async findAll(): Promise<Role[]> {
            return this.roleRepository.findAll();
        }
        public async create(role: CreateRoleDto): Promise<Role> {
            return this.roleRepository.create(role);
        }
        public async update(roleId: string, role: UpdateRoleDto): Promise<Role> {
            return this.roleRepository.update(roleId, role);
        }
        public async deleteRoleById(roleId: string): Promise<DeleteResult> {
            return this.roleRepository.deleteRoleById(roleId);
        }



}