import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    // como só se pode criar um appointment por dia, antes de criar um novo,
    // este service verifica se ja existe algum appointment naquele dia

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      // Se existe, um erro é chamado, instanciado
      throw new AppError('This appointment is already booked');
    }
    // caso não exista appointments, um appointment é criado e depois salvo no db
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    // método e save (salva e atualiza registros em ums db)
    await appointmentsRepository.save(appointment);

    // retorna o appointmetn pra rota
    return appointment;
  }
}

export default CreateAppointmentService;
