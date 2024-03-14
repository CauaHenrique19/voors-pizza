import { FindSizesUseCase } from 'src/domain/usecases';
import { Controller, HttpResponse } from 'src/presentation/protocols';
import { notFound, ok, serverError } from 'src/presentation/helpers';

export class FindSizesController implements Controller {
  constructor(private readonly findSizesUseCase: FindSizesUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const sizes = await this.findSizesUseCase.find();

      if (!sizes.length) {
        return notFound();
      }

      return ok(sizes);
    } catch (error) {
      return serverError(error);
    }
  }
}
