import { FindPersonalizationsUseCase } from 'src/domain/usecases';
import { Controller, HttpResponse } from 'src/presentation/protocols';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { PersonalizationsNotFoundError } from 'src/domain/errors';

export class FindPersonalizationsController implements Controller {
  constructor(
    private readonly findPersonalizationsUseCase: FindPersonalizationsUseCase,
  ) {}

  async handle(): Promise<HttpResponse> {
    try {
      const personalizations = await this.findPersonalizationsUseCase.find();
      return ok(personalizations);
    } catch (error) {
      if (error instanceof PersonalizationsNotFoundError) {
        return notFound(error);
      }

      return serverError(error);
    }
  }
}
