import { Provider } from '@nestjs/common';
import { FindSizes } from 'src/data/usecases';
import { FindSizesUseCase } from 'src/domain/usecases';
import { SizePrismaRepository } from 'src/infra/orm/repositories';
import { FIND_SIZES_FACTORY } from 'src/main/factories/providers';

export const findSizesFactory: Provider = {
  provide: FIND_SIZES_FACTORY,
  useFactory: (
    personalizationPrismaRepository: SizePrismaRepository,
  ): FindSizesUseCase => {
    return new FindSizes(personalizationPrismaRepository);
  },
  inject: [SizePrismaRepository],
};
