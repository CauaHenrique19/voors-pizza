import { FindSizesUseCase } from 'src/domain/usecases';
import { Controller, HttpResponse } from 'src/presentation/protocols';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { SizesNotFoundError } from 'src/domain/errors';

export class FindSizesController implements Controller {
  constructor(private readonly findSizesUseCase: FindSizesUseCase) {}

  async handle(): Promise<HttpResponse> {
    try {
      const sizes = await this.findSizesUseCase.find();
      return ok(sizes);
    } catch (error) {
      if (error instanceof SizesNotFoundError) {
        return notFound(error);
      }

      return serverError(error);
    }
  }
}
