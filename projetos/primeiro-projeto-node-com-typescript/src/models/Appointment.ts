import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('appointments')// decorator, associoa a classe Appointment à entidade appointment do database
class Appointment {
    @PrimaryGeneratedColumn('uuid')// associoa a coluna id à coluna id do db
    id: string;

    @Column()// associoa a coluna provider à coluna provider do db
    provider: string;

    @Column('timestamp with time zone')
    date: Date;// associoa a coluna date à coluna date do db

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    update_at: Date;
}

export default Appointment;
