import { FindFlavoursRepository } from 'src/data/protocols/db';
import { FlavoursNotFoundError } from 'src/domain/errors';
import { FindFlavoursUseCase } from 'src/domain/usecases';

export class FindFlavours implements FindFlavoursUseCase {
  constructor(
    private readonly findFlavoursRepository: FindFlavoursRepository,
  ) {}

  async find(): Promise<FindFlavoursUseCase.Result> {
    const flavours = await this.findFlavoursRepository.find();

    if (!flavours.length) {
      throw new FlavoursNotFoundError();
    }

    return flavours;
  }
}
