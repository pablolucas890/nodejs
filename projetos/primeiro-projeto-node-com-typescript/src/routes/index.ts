import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();
/**
 * Atribuição das rotas para cada rota da pasta
 */
routes.use('/appointments', appointmentsRouter);
/**
 * GET e POST
 */
routes.use('/users', usersRouter);
/**
 * POST e PATCH (para as fotos)
 */
routes.use('/sessions', sessionsRouter);
/**
 * POST
 */
export default routes;
