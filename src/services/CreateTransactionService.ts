import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  // inversão de dependencia

  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, value, title }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Sorry, transaction type invalid!');
    }

    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new Error('No enougth cash stranger!!');
    }

    const transaction = this.transactionsRepository.create({
      type,
      value,
      title,
    });

    return transaction;
  }
}

export default CreateTransactionService;
