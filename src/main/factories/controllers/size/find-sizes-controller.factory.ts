import { Inject, Injectable } from '@nestjs/common';
import { FindSizesUseCase } from 'src/domain/usecases';
import { FIND_SIZES_FACTORY } from 'src/main/factories/providers';
import { FindSizesController } from 'src/presentation/controllers';
import { Controller } from 'src/presentation/protocols';

@Injectable()
export class BuildFindSizesControllerFactory {
  constructor(
    @Inject(FIND_SIZES_FACTORY)
    private readonly findSizesUseCase: FindSizesUseCase,
  ) {}

  public build(): Controller {
    return new FindSizesController(this.findSizesUseCase);
  }
}
