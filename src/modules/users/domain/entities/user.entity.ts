import { OrganizationalUnit } from "src/modules/organizational_units/domain/entities/organizational_unit.entity";
import { Project } from "src/modules/projects/domain/entities/project.entity";
import { Role } from "src/modules/roles/domain/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User{


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    username:string

    @Column({unique:true})
    email:string

    @Column()
    password_hash: string 

    @CreateDateColumn()
    created_at: Date

    @ManyToMany(() => OrganizationalUnit, organizational_unit => organizational_unit.user)
    @JoinTable()
    organizationalUnit: OrganizationalUnit[]

    @ManyToMany(() => Project, project => project.users)
    @JoinTable()
    project: Project[]

    @ManyToMany(() => Role,role => role.user)
    @JoinTable()
    role: Role[]

}

