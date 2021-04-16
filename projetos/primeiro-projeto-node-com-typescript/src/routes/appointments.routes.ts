/**
 * Rotas da tabela appointment
 * GET, POST
 */
import { parseISO } from 'date-fns';
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
// Router do Express

appointmentsRouter.use(ensureAuthenticated);
// Utilização do middleware de autenticação de token antes das rotas

appointmentsRouter.get('/', async (request, response) => {
  // List

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  // Repositório Personalizado que lista appointments por data

  const appointments = await appointmentsRepository.find();
  // todos os appointments que vieram do repositorios
  return response.json({ appointments });
});

appointmentsRouter.post('/', async (request, response) => {
// Create

  const { provider_id, date } = request.body;
  // Json recebido pela rota com provider_id, date

  const parsedDate = parseISO(date);
  // transforma a data pro modelo desejado

  // Como antes de criar uma agendamento é necessário passar por algumas
  // verificações, um service é criado
  const createAppointment = new CreateAppointmentService();
  // createAppointment é uma instancia do service de criação de Appointment

  // caso a promisse do método execute do service funcione, ele retorna o appointment criado

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });

  // apresentação do appointment em json format
  return response.json(appointment);
});

// export das rotas pro index poder utilizalas com o express
export default appointmentsRouter;
