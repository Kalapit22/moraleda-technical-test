import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PermissionService } from "./application/services/permission.service";
import { PermissionRepository } from "./infrastructure/repositories/permission.repository";
import { Permission } from "./domain/permission.entity";
import { PermissionController } from "./presentation/permission.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
  ],
  controllers: [PermissionController],
  providers: [
    PermissionService,
    {
      provide: 'IPermissionRepository',
      useClass: PermissionRepository,
    },
  ],
  exports: [PermissionService],
})
export class PermissionModule {}
