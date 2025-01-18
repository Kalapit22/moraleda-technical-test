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
import  {ConfigModule, ConfigService} from '@nestjs/config'
import { AuthModule } from './modules/auth/auth.module';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory: (configService:ConfigService) => ({
          type: 'postgres',
          host: configService.getOrThrow('DB_HOST'),
          port:  configService.getOrThrow('DB_PORT'),
          username: configService.getOrThrow('DB_USERNAME'),
          password:  configService.getOrThrow('DB_PASSWORD'),
          database: configService.getOrThrow('DB_DATABASE'),
          synchronize: true,
          ssl:true
          
        }),
        inject: [ConfigService]
      }
    ),
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
