import { FindSizesRepository } from 'src/data/protocols/db';
import { SizesNotFoundError } from 'src/domain/errors';
import { FindSizesUseCase } from 'src/domain/usecases';

export class FindSizes implements FindSizesUseCase {
  constructor(private readonly findSizesRepository: FindSizesRepository) {}

  async find(): Promise<FindSizesUseCase.Result> {
    const sizes = await this.findSizesRepository.find();

    if (!sizes.length) {
      throw new SizesNotFoundError();
    }

    return sizes;
  }
}
