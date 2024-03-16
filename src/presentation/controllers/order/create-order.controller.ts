import { Controller, HttpResponse } from 'src/presentation/protocols';
import { CreateOrderUseCase } from 'src/domain/usecases';
import {
  badRequest,
  notFound,
  ok,
  serverError,
} from 'src/presentation/helpers';
import {
  FlavourNotFoundError,
  PersonalizationNotFoundError,
  RepeatedPersonalizationError,
  SizeNotFoundError,
} from 'src/domain/errors';

export class CreateOrderController implements Controller {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  async handle(
    parameters: CreateOrderController.Parameters,
  ): Promise<HttpResponse> {
    try {
      const createdOrder = await this.createOrderUseCase.create(parameters);
      return ok(createdOrder);
    } catch (error) {
      if (
        error instanceof SizeNotFoundError ||
        error instanceof FlavourNotFoundError ||
        error instanceof PersonalizationNotFoundError
      ) {
        return notFound(error);
      }

      if (error instanceof RepeatedPersonalizationError) {
        return badRequest(error);
      }

      return serverError(error);
    }
  }
}

export namespace CreateOrderController {
  export type Parameters = CreateOrderUseCase.Parameters;
}
