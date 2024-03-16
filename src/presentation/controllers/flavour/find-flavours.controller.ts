import { FindFlavoursUseCase } from 'src/domain/usecases';
import { Controller, HttpResponse } from 'src/presentation/protocols';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { FlavoursNotFoundError } from 'src/domain/errors';

export class FindFlavoursController implements Controller {
  constructor(private readonly findFlavoursUseCase: FindFlavoursUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const flavours = await this.findFlavoursUseCase.find();
      return ok(flavours);
    } catch (error) {
      if (error instanceof FlavoursNotFoundError) {
        return notFound(error);
      }

      return serverError(error);
    }
  }
}
