import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateProjectDto } from "../application/dto/create-project.dto";
import { UpdateProjectDto } from "../application/dto/update-project.dto";
import { IProjectRepository } from "../application/ports/project.interface.repository";
import { Project } from "../domain/entities/project.entity";


@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>
  ) {}

  async findById(id: string): Promise<Project | null> {
    return this.repository.findOne({ where: { id }});
  }

  async findAll(): Promise<Project[]> {
    return this.repository.find();
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.repository.create(createProjectDto);
    return this.repository.save(project);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    await this.repository.update(id, updateProjectDto);
    return this.repository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }
}
