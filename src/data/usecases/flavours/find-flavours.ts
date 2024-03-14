import { FindFlavoursRepository } from 'src/data/protocols/db';
import { FindFlavoursUseCase } from 'src/domain/usecases';

export class FindFlavours implements FindFlavoursUseCase {
  constructor(
    private readonly findFlavoursRepository: FindFlavoursRepository,
  ) {}

  async find(): Promise<FindFlavoursUseCase.Result> {
    return await this.findFlavoursRepository.find();
  }
}
