import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { IOrganizationalUnitRepository } from "../ports/organizational_units.interface.repository";
import { DeleteResult } from "typeorm";
import { OrganizationalUnit } from "../../domain/entities/organizational_unit.entity";
import { CreateOrganizationalUnitDto } from "../dto/create-organizational_unit.dto";
import { UpdateOrganizationalUnitDto } from "../dto/update-organizational_unit.dto";
import { IUserRepository } from "src/modules/users/application/ports/user-repository.interface";
import { IProjectRepository } from "src/modules/projects/application/ports/project.interface.repository";

@Injectable()
export class OrganizationalUnitService {

    constructor(
        @Inject('IOrganizationalUnitRepository')
        private readonly organizationalUnitRepository: IOrganizationalUnitRepository,

        @Inject('IProjectRepository')
        private readonly projectRepository: IProjectRepository,

        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
    ) { }

    public async findById(id: string): Promise<OrganizationalUnit | null> {
        const unit = await this.organizationalUnitRepository.findById(id);
        if (!unit) {
            throw new NotFoundException(`Organizational Unit with id ${id} not found`);
        }
        return unit;
    }

    public async findAll(): Promise<OrganizationalUnit[]> {
        return this.organizationalUnitRepository.findAll();
    }

    public async create(createDto: CreateOrganizationalUnitDto): Promise<OrganizationalUnit> {

        const userExists = await this.checkIfUserExists(createDto.userId);
        if (!userExists) {
            throw new NotFoundException(`User with id ${createDto.userId} not found`);
        }

        const projectExists = await this.checkIfProjectExists(createDto.projectId);
        if (!projectExists) {
            throw new NotFoundException(`Project with id ${createDto.projectId} not found`);
        }
        
        return this.organizationalUnitRepository.create(createDto);
    }

    public async update(id: string, updateDto: UpdateOrganizationalUnitDto): Promise<OrganizationalUnit> {
        const userExists = await this.checkIfUserExists(updateDto.userId);
        if (!userExists) {
            throw new NotFoundException(`User with id ${updateDto.userId} not found`);
        }
        const projectExists = await this.checkIfProjectExists(updateDto.projectId);
        if (!projectExists) {
            throw new NotFoundException(`Project with id ${updateDto.projectId} not found`);
        }

        return this.organizationalUnitRepository.update(id, updateDto);
    }

    public async deleteById(id: string): Promise<DeleteResult> {
        return this.organizationalUnitRepository.deleteById(id);
    }


    private checkIfUserExists(userId: string) {
        return this.userRepository.findById(userId);
    }

    private checkIfProjectExists(projectId: string) {
        return this.projectRepository.findById(projectId);
    }

}