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
        //await this.validateIfUserAndProjectExist(createDto.userId, createDto.projectId);
        return this.organizationalUnitRepository.create(createDto);
    }

    public async update(id: string, updateDto: UpdateOrganizationalUnitDto): Promise<OrganizationalUnit> {
        return this.organizationalUnitRepository.update(id, updateDto);
    }

    public async deleteById(id: string): Promise<DeleteResult> {
        return this.organizationalUnitRepository.deleteById(id);
    }


    validateIfUserAndProjectExist = async (userId: string, projectId: string) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        const project = await this.projectRepository.findById(projectId);
        if (!project) {
            throw new NotFoundException(`Project with id ${projectId} not found`);
        }
    }

}