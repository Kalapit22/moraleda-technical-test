import { DeleteResult } from "typeorm";
import { CreateProjectDto } from "../dto/create-project.dto";
import { UpdateProjectDto } from "../dto/update-project.dto";
import { Project } from "../../domain/entities/project.entity";

export interface IProjectRepository {
  findById(id: string): Promise<Project | null>;
  findAll(): Promise<Project[]>;
  create(project: CreateProjectDto): Promise<Project>;
  update(id: string, project: UpdateProjectDto): Promise<Project>;
  deleteById(id: string): Promise<DeleteResult>;
}
