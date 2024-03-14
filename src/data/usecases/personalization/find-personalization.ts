import { FindPersonalizationsRepository } from 'src/data/protocols/db';
import { FindPersonalizationsUseCase } from 'src/domain/usecases';

export class FindPersonalizations implements FindPersonalizationsUseCase {
  constructor(
    private readonly findPersonalizationsRepository: FindPersonalizationsRepository,
  ) {}

  async find(): Promise<FindPersonalizationsUseCase.Result> {
    return await this.findPersonalizationsRepository.find();
  }
}
