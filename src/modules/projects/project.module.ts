import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "./domain/entities/project.entity";
import { ProjectService } from "./application/services/project.service";
import { ProjectRepository } from "./infrastructure/project.repository";
import { ProjectController } from "./presentation/project.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project]),
  ],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepository,
    },
  ],
  exports: [ProjectService],
})
export class ProjectModule {}
