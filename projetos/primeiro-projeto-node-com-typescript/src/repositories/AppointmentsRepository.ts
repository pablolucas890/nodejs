/**
 * repositório personalizado do typeorm, o type orm disponibiliza repositorios prontos
 * como seleção unica, seleção de varios, update, save, delete, etc...
 * porém nesta aplicação se julgou necessário a utilização do repositório de veridicação
 * se já existe um appointment com a data criada
 */
import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
