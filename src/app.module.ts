import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { RoleModule } from './modules/roles/role.module';
import { PermissionModule } from './modules/permissions/permission.module';
import { ProjectModule } from './modules/projects/project.module';
import { OrganizationalUnitModule } from './modules/organizational_units/organizational_unit.module';
import { VehicleModule } from './modules/vehicles/vehicle.module';
import { TransferModule } from './modules/transfers/transfer.module';
import  {ConfigModule} from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: "Kalapit22*",
      database: 'postgres',
      autoLoadEntities:true,
      synchronize:true
    }),
    AuthModule,
    UserModule,
    RoleModule,
    PermissionModule,
    ProjectModule,
    OrganizationalUnitModule,
    VehicleModule,
    TransferModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],  
})
export class AppModule {}
