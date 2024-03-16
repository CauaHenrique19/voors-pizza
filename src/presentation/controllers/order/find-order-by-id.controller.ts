import { OrderNotFoundError } from 'src/domain/errors';
import { FindOrderByIdUseCase } from 'src/domain/usecases';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { Controller, HttpResponse } from 'src/presentation/protocols';

export class FindOrderByIdController implements Controller {
  constructor(private readonly findOrderByIdUseCase: FindOrderByIdUseCase) {}

  async handle(
    parameters: FindOrderByIdController.Parameters,
  ): Promise<HttpResponse> {
    try {
      const order = await this.findOrderByIdUseCase.find(parameters);
      return ok(order);
    } catch (error) {
      if (error instanceof OrderNotFoundError) {
        return notFound(error);
      }

      return serverError(error);
    }
  }
}

export namespace FindOrderByIdController {
  export type Parameters = FindOrderByIdUseCase.Parameters;
}
