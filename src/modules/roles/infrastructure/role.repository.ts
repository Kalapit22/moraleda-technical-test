import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateRoleDto } from "../application/dto/create-role.dto";
import { UpdateRoleDto } from "../application/dto/update-role.dto";
import { IRoleRepository } from "../application/ports/role.interface.repository";
import { Role } from "../domain/entities/role.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class RoleRepository implements IRoleRepository {
    constructor(
        @InjectRepository(Role)
        private readonly repository: Repository<Role>
    ){}


    public async findById(id: string): Promise<Role | null> {
        return this.repository.findOne({where: {id}});
    }
    public async findByName(name: string): Promise<Role | null> {
        return this.repository.findOne({where: {name}})
    }
    public async findAll(): Promise<Role[]> {
        return this.repository.find();
    }
    public async create(role: CreateRoleDto): Promise<Role> {
        return this.repository.save(role);
    }
    public async update(roleId: string, role: UpdateRoleDto): Promise<Role> {
        await this.repository.update(roleId, role);
        return this.repository.findOne({where: {id: roleId}});
    }
    public async deleteRoleById(roleId: string): Promise<DeleteResult> {
        return this.repository.delete(roleId);
    }



}