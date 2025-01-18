import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Column,
    ManyToOne,
  } from 'typeorm';
  import { Vehicle } from 'src/modules/vehicles/domain/entities/vehicle.entity';
  import { User } from 'src/modules/users/domain/entities/user.entity';
  import { Project } from 'src/modules/projects/domain/entities/project.entity';
  import { OrganizationalUnit } from 'src/modules/organizational_units/domain/entities/organizational_unit.entity';
  
  @Entity('transfers')
  export class Transfer {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @Column()
    type: string;
  
    @ManyToOne(() => Vehicle, { nullable: false,onDelete:'CASCADE',eager:true })
    vehicle: Vehicle;
  
    @ManyToOne(() => User, { nullable: false })
    client: User;
  
    @ManyToOne(() => User, { nullable: false,eager:true})
    transmitter: User;
  
    @ManyToOne(() => Project, { nullable: false,eager:true })
    project: Project;
  
    @ManyToOne(() => OrganizationalUnit, { nullable: false,eager:true })
    organizationalUnit: OrganizationalUnit;
  }
  