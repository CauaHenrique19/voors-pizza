import { Provider } from '@nestjs/common';
import { FindPersonalizations } from 'src/data/usecases';
import { FindPersonalizationsUseCase } from 'src/domain/usecases';
import { PersonalizationPrismaRepository } from 'src/infra/orm/repositories';
import { FIND_PERSONALIZATIONS_FACTORY } from 'src/main/factories/providers';

export const findPersonalizationsFactory: Provider = {
  provide: FIND_PERSONALIZATIONS_FACTORY,
  useFactory: (
    personalizationPrismaRepository: PersonalizationPrismaRepository,
  ): FindPersonalizationsUseCase => {
    return new FindPersonalizations(personalizationPrismaRepository);
  },
  inject: [PersonalizationPrismaRepository],
};
