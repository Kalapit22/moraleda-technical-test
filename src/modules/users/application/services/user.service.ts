import { Inject, Injectable } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { IUserRepository } from "../ports/user-repository.interface";
import * as bcrypt from 'bcrypt'
import { PasswordHashingService } from "src/modules/password_hashing/password_hashing.service";
@Injectable()
export class UserService{
   
    constructor(
        @Inject('IUserRepository')
        private readonly userRepository: IUserRepository,
        private readonly passwordHashingService: PasswordHashingService
    ){}


    public async findById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
    public async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
    public async findAll(): Promise<User[]> {
        return this.userRepository.findAll();
    }
    public async create(user: CreateUserDto): Promise<User> {
        const hashedPassword  = await this.passwordHashingService.hashPassword(user.password_hash);
        return this.userRepository.create({
            email: user.email,
            password_hash: hashedPassword,
            username: user.username
        });
    }
    public async update(id:string,user: UpdateUserDto): Promise<User> {
        return this.userRepository.update(id, user);
    }
    public async deleteUserById(userId: string): Promise<DeleteResult> {
        return this.userRepository.deleteUserById(userId);
    }
}


