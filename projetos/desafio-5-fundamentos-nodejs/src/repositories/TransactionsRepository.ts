import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let income: number = 0;
    let outcome: number = 0;
    for (let index = 0; index < this.transactions.length; index += 1) {
      const transiction = this.transactions[index];
      if (transiction.type === 'income') {
        income += transiction.value;
      } else {
        outcome += transiction.value;
      }
    }
    const total = income - outcome;
    console.log(income, outcome, total);

    const balanco = {
      income,
      outcome,
      total,
    };

    return balanco;
  }

  public create({ title, value, type }:Transaction): Transaction {
    const transiction = new Transaction({ title, value, type });
    this.transactions.push(transiction);
    return transiction;
  }
}

export default TransactionsRepository;
