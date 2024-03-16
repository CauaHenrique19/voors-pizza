import { FindOrderByIdRepository } from 'src/data/protocols/db';
import { OrderNotFoundError } from 'src/domain/errors';
import { FindOrderByIdUseCase } from 'src/domain/usecases';

export class FindOrderById implements FindOrderByIdUseCase {
  constructor(
    private readonly findOrderByIdRepository: FindOrderByIdRepository,
  ) {}

  async find(
    parameters: FindOrderByIdRepository.Parameters,
  ): Promise<FindOrderByIdRepository.Result> {
    const order = await this.findOrderByIdRepository.find(parameters);

    if (!order) {
      throw new OrderNotFoundError();
    }

    return order;
  }
}
