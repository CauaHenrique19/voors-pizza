import { FindFlavoursUseCase } from 'src/domain/usecases';
import { Controller, HttpResponse } from 'src/presentation/protocols';
import { notFound, ok, serverError } from 'src/presentation/helpers';

export class FindFlavoursController implements Controller {
  constructor(private readonly findFlavoursUseCase: FindFlavoursUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const flavours = await this.findFlavoursUseCase.find();

      if (!flavours.length) {
        return notFound();
      }

      return ok(flavours);
    } catch (error) {
      return serverError(error);
    }
  }
}
