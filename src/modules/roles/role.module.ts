import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./domain/entities/role.entity";
import { RoleController } from "./presentation/role.controller";
import { RoleService } from "./application/services/role.service";
import { RoleRepository } from "./infrastructure/role.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Role])
    ],
    controllers: [RoleController],
    providers:[
        RoleService,{
            provide: 'IRoleRepository',
            useClass: RoleRepository
        }
    ],
    exports: [RoleService]
})
export class RoleModule{}