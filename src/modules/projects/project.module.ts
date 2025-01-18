import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Project } from "./domain/entities/project.entity";
import { ProjectService } from "./application/services/project.service";
import { ProjectRepository } from "./infrastructure/project.repository";
import { ProjectController } from "./presentation/project.controller";
import { User } from "../users/domain/entities/user.entity";
import { OrganizationalUnit } from "../organizational_units/domain/entities/organizational_unit.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Project,User,OrganizationalUnit]),
  ],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    {
      provide: 'IProjectRepository',
      useClass: ProjectRepository,
    },
    {
      provide: 'IUserRepository',
      useClass: ProjectRepository,
    },
    {
      provide: 'IOrganizationalUnitRepository',
      useClass: ProjectRepository
    }

  ],
  exports: [ProjectService],
})
export class ProjectModule {}
