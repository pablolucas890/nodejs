import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type } : Transaction): Transaction {
    // fazer o create
    const transictionReturnedFromRepository = this.transactionsRepository.create({
      id: '',
      title,
      value,
      type,
    });

    return transictionReturnedFromRepository;
  }
}

export default CreateTransactionService;
