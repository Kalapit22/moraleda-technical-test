import { Project } from "src/modules/projects/domain/entities/project.entity";
import { User } from "src/modules/users/domain/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('organizational_units')
export class OrganizationalUnit {


    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name: string;

    @CreateDateColumn()
    createdAt:Date;

    @ManyToMany(() => User, user => user.organizationalUnit)
    user: User[];

    @ManyToOne(() => Project, project => project.organizationalUnit, {onDelete: 'CASCADE'})
    project: Project;

}

