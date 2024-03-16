import { Inject } from '@nestjs/common';
import { CREATE_ORDER_FACTORY } from 'src/main/factories/providers';
import { CreateOrderUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';
import { CreateOrderController } from 'src/presentation/controllers';

export class BuildCreateOrderControllerFactory {
  constructor(
    @Inject(CREATE_ORDER_FACTORY)
    private readonly createOrderUseCase: CreateOrderUseCase,
  ) {}

  public build(): Controller {
    return new CreateOrderController(this.createOrderUseCase);
  }
}
