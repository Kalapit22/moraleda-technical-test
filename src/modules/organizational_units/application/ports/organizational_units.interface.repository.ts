import { DeleteResult } from "typeorm";
import { OrganizationalUnit } from "../../domain/entities/organizational_unit.entity";
import { CreateOrganizationalUnitDto } from "../dto/create-organizational_unit.dto";
import { UpdateOrganizationalUnitDto } from "../dto/update-organizational_unit.dto";


export interface IOrganizationalUnitRepository {
    findById(id: string): Promise<OrganizationalUnit | null>;
    findAll(): Promise<OrganizationalUnit[]>;
    create(organizationalUnit: CreateOrganizationalUnitDto): Promise<OrganizationalUnit>;
    update(id: string, organizationalUnit: UpdateOrganizationalUnitDto): Promise<OrganizationalUnit>;
    deleteById(id: string): Promise<DeleteResult>;
}