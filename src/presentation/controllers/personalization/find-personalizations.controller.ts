import { FindPersonalizationsUseCase } from 'src/domain/usecases';
import { Controller, HttpResponse } from 'src/presentation/protocols';
import { notFound, ok, serverError } from 'src/presentation/helpers';

export class FindPersonalizationsController implements Controller {
  constructor(
    private readonly findPersonalizationsUseCase: FindPersonalizationsUseCase,
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const personalizations = await this.findPersonalizationsUseCase.find();

      if (!personalizations.length) {
        return notFound();
      }

      return ok(personalizations);
    } catch (error) {
      return serverError(error);
    }
  }
}
