import { Module } from "@nestjs/common";
import { OrganizationalUnit } from "./domain/entities/organizational_unit.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationalUnitService } from "./application/services/organizational_unit.service";
import { OrganizationalUnitController } from "./presentation/organizational_unit.controller";
import { OrganizationalUnitRepository } from "./infrastructure/repository/organizational_user.repository";
import { ProjectRepository } from "../projects/infrastructure/project.repository";
import { UserRepository } from "../users/infrastructure/repositories/user.repository";
import { Project } from "../projects/domain/entities/project.entity";
import { User } from "../users/domain/entities/user.entity";

@Module({
    imports: [TypeOrmModule.forFeature([OrganizationalUnit,Project,User])],
    providers: [
        OrganizationalUnitService,{
            provide: 'IOrganizationalUnitRepository',
            useClass: OrganizationalUnitRepository
        },
        {
            provide: 'IProjectRepository',
            useClass: ProjectRepository
        },
        {
            provide: 'IUserRepository',
            useClass: UserRepository
        }
    ],
    controllers: [OrganizationalUnitController],
    exports: [OrganizationalUnitService]
})
export class OrganizationalUnitModule{}