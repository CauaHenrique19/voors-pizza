import { FindPersonalizationsRepository } from 'src/data/protocols/db';
import { PersonalizationsNotFoundError } from 'src/domain/errors';
import { FindPersonalizationsUseCase } from 'src/domain/usecases';

export class FindPersonalizations implements FindPersonalizationsUseCase {
  constructor(
    private readonly findPersonalizationsRepository: FindPersonalizationsRepository,
  ) {}

  async find(): Promise<FindPersonalizationsUseCase.Result> {
    const personalizations = await this.findPersonalizationsRepository.find();

    if (!personalizations.length) {
      throw new PersonalizationsNotFoundError();
    }

    return personalizations;
  }
}
