import { Permission } from "src/modules/permissions/domain/permission.entity";
import { User } from "src/modules/users/domain/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique:true})
    name:string;

    @Column()
    description: string;

    @ManyToMany(() => User, user => user.role)
    user: User[]

    @ManyToMany(() => Permission, permission => permission.role)
    @JoinTable()
    permission: Permission[]
}