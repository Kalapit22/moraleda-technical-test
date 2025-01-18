import { OrganizationalUnit } from "src/modules/organizational_units/domain/entities/organizational_unit.entity";
import { User } from "src/modules/users/domain/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;


  @ManyToMany(() => User, user => user.project)
  user: User;
 
  @OneToMany(() => OrganizationalUnit, organizationalUnit => organizationalUnit.project)
  organizationalUnit: OrganizationalUnit;

    


    


}
