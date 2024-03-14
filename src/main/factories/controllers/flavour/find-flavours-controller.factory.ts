import { Inject, Injectable } from '@nestjs/common';
import { FindFlavoursUseCase } from 'src/domain/usecases';
import { FIND_FLAVOURS_FACTORY } from 'src/main/factories/providers';
import { FindFlavoursController } from 'src/presentation/controllers';
import { Controller } from 'src/presentation/protocols';

@Injectable()
export class BuildFindFlavoursControllerFactory {
  constructor(
    @Inject(FIND_FLAVOURS_FACTORY)
    private readonly findFlavoursUseCase: FindFlavoursUseCase,
  ) {}

  public build(): Controller {
    return new FindFlavoursController(this.findFlavoursUseCase);
  }
}
