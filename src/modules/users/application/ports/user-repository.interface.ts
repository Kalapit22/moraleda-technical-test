import { DeleteResult } from "typeorm";
import { User } from "../../domain/entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";



export interface IUserRepository {
    findById(id:string) : Promise<User | null>;
    findByEmail(email:string): Promise<User | null>
    findAll(): Promise<User[]>;
    create(user:CreateUserDto): Promise<User>;
    update(userId:string,user:UpdateUserDto): Promise<User>;
    deleteUserById(userId:string):Promise<DeleteResult>;
}

