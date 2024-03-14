import { Module } from '@nestjs/common';
import {
  FlavourPrismaRepository,
  PersonalizationPrismaRepository,
} from 'src/infra/orm/repositories';
import {
  findFlavoursFactory,
  findPersonalizationsFactory,
} from 'src/main/factories/usecases';

@Module({
  providers: [
    PersonalizationPrismaRepository,
    FlavourPrismaRepository,

    findPersonalizationsFactory,
    findFlavoursFactory,
  ],
  exports: [findPersonalizationsFactory, findFlavoursFactory],
})
export class FactoryModule {}
