import { Inject, Injectable } from '@nestjs/common';
import { FindPersonalizationsUseCase } from 'src/domain/usecases';
import { FIND_PERSONALIZATIONS_FACTORY } from 'src/main/factories/providers';
import { FindPersonalizationsController } from 'src/presentation/controllers';
import { Controller } from 'src/presentation/protocols';

@Injectable()
export class BuildFindPersonalizationsControllerFactory {
  constructor(
    @Inject(FIND_PERSONALIZATIONS_FACTORY)
    private readonly findPersonalizationsUseCase: FindPersonalizationsUseCase,
  ) {}

  public build(): Controller {
    return new FindPersonalizationsController(this.findPersonalizationsUseCase);
  }
}
