import { Provider } from '@nestjs/common';
import { FindFlavours } from 'src/data/usecases';
import { FindFlavoursUseCase } from 'src/domain/usecases';
import { FlavourPrismaRepository } from 'src/infra/orm/repositories';
import { FIND_FLAVOURS_FACTORY } from 'src/main/factories/providers';

export const findFlavoursFactory: Provider = {
  provide: FIND_FLAVOURS_FACTORY,
  useFactory: (
    flavourPrismaRepository: FlavourPrismaRepository,
  ): FindFlavoursUseCase => {
    return new FindFlavours(flavourPrismaRepository);
  },
  inject: [FlavourPrismaRepository],
};
