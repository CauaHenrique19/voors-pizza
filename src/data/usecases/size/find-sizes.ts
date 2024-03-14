import { FindSizesRepository } from 'src/data/protocols/db';
import { FindSizesUseCase } from 'src/domain/usecases';

export class FindSizes implements FindSizesUseCase {
  constructor(private readonly findSizesRepository: FindSizesRepository) {}

  async find(): Promise<FindSizesUseCase.Result> {
    return await this.findSizesRepository.find();
  }
}
