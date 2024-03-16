import { Inject } from '@nestjs/common';
import { FIND_ORDER_BY_ID_FACTORY } from 'src/main/factories/providers';
import { FindOrderByIdUseCase } from 'src/domain/usecases';
import { Controller } from 'src/presentation/protocols';
import { FindOrderByIdController } from 'src/presentation/controllers';

export class BuildFindOrderByIdControllerFactory {
  constructor(
    @Inject(FIND_ORDER_BY_ID_FACTORY)
    private readonly findOrderByIdUseCase: FindOrderByIdUseCase,
  ) {}

  public build(): Controller {
    return new FindOrderByIdController(this.findOrderByIdUseCase);
  }
}
