import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./application/services/user.service";
import { User } from "./domain/entities/user.entity";
import { UserRepository } from "./infrastructure/repositories/user.repository";
import { UserController } from "./presentation/user.controller";
import { PasswordHashingService } from "../password_hashing/password_hashing.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers:[UserController],
    providers: [
        PasswordHashingService,
        UserService,{
        provide: 'IUserRepository',
        useClass: UserRepository
    }],
    exports: [UserService],
})
export class UserModule{}