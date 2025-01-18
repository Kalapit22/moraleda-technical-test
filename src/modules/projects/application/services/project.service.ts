import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Project } from "../../domain/entities/project.entity";
import { IProjectRepository } from "../ports/project.interface.repository";
import { DeleteResult } from "typeorm";
import { IUserRepository } from "src/modules/users/application/ports/user-repository.interface";
import { IOrganizationalUnitRepository } from "src/modules/organizational_units/application/ports/organizational_units.interface.repository";

@Injectable()
export class ProjectService {
  constructor(
    @Inject('IProjectRepository')
    private readonly projectRepository: IProjectRepository,

    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,

    @Inject('IOrganizationalUnitRepository')
    private readonly organizationalUnitRepository: IOrganizationalUnitRepository

  ) {}

  async findById(id: string): Promise<Project | null> {
    const project = await this.projectRepository.findById(id);
    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }
    return project;
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepository.findAll();
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.create(createProjectDto);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectRepository.update(id, updateProjectDto);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.projectRepository.deleteById(id);
  }

  private async checkIfUserExists(userId:string) {
    return await this.userRepository.findById(userId);
  }


  private async checkIfOrganizationalUnitExists(organizationalUnitId:string) {
    return await this.organizationalUnitRepository.findById(organizationalUnitId);
  }
}
