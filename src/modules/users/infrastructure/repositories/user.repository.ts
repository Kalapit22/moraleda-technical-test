import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UpdateUserDto } from "../../application/dto/update-user.dto";
import { IUserRepository } from "../../application/ports/user-repository.interface";
import { User } from "../../domain/entities/user.entity";
import { DeleteResult, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ){}


    public async findById(id: string): Promise<User | null> {
        return this.repository.findOne({where: {id}});
    }
    public async findByEmail(email: string): Promise<User | null> {
        return this.repository.findOne({where: {email}});
    }
    public async findAll(): Promise<User[]> {
        return this.repository.find();
    }
    public async create(user: CreateUserDto): Promise<User> {
        return this.repository.save(user);
    }
    public async update(id:string,user: UpdateUserDto): Promise<User> {
        await this.repository.update(id, user);
        return this.repository.findOne({where: {id}});
    }
    public async deleteUserById(userId: string): Promise<DeleteResult> {
        return this.repository.delete(userId);
    }


}




