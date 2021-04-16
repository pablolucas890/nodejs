import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    // TODO
    const transictionsReturnedsFromRepository = transactionsRepository.all();
    const balanceRepositories = transactionsRepository.getBalance();
    return response.json({ transictionsReturnedsFromRepository, balanceRepositories });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const transactionService = new CreateTransactionService(transactionsRepository);
    const transictionReturnedFromService = transactionService.execute({
      id: '',
      title,
      value,
      type,
    });
    // fazer o execute do serice
    return response.json(transictionReturnedFromService);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
