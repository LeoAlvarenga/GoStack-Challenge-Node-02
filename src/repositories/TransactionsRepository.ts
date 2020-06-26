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
    return this.transactions
    
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((previousValue, element) => element.type === 'income' ? previousValue += element.value : previousValue = previousValue, 0)
    const outcome = this.transactions.reduce((previousValue, element) => element.type === 'outcome' ? previousValue += element.value : previousValue = previousValue, 0)
    const total = income - outcome

    const balance = {
      income,
      outcome,
      total
    }

    return balance
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {

    const transaction = new Transaction({title, value, type})

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository;
