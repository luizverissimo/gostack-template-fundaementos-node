import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (previousValue: number, currentValue: Transaction) =>
          previousValue + currentValue.value,
        0,
      );
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (previousValue: number, currentValue: Transaction) =>
          previousValue + currentValue.value,
        0,
      );
    const total = this.transactions.reduce(
      (previousValue: number, currentValue: Transaction) => {
        if (currentValue.type === 'income') {
          return (previousValue + currentValue.value) as number;
        }
        return (previousValue - currentValue.value) as number;
      },
      0,
    );

    return { income, outcome, total } as Balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
