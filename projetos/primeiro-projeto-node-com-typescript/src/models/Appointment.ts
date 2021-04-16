/**
 * Modelo de Appointments (agendamentos, relaciona as entidades dos agendamentos com as do banco)
 */
import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('appointments')// decorator, associoa a classe Appointment à entidade appointment do database
class Appointment {
    @PrimaryGeneratedColumn('uuid')// associoa a coluna id à coluna id do db
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;// associoa a coluna date à coluna date do db

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
