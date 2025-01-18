import { DeleteResult } from "typeorm";
import { CreateRoleDto } from "../dto/create-role.dto";
import { UpdateRoleDto } from "../dto/update-role.dto";
import { Role } from "../../domain/entities/role.entity";




export interface IRoleRepository {
    findById(id:string) : Promise<Role | null>;
    findByName(name:string): Promise<Role | null>
    findAll(): Promise<Role[]>;
    create(role:CreateRoleDto): Promise<Role>;
    update(roleId:string,role:UpdateRoleDto): Promise<Role>;
    deleteRoleById(roleId:string):Promise<DeleteResult>;

}
