import { Module } from '@nestjs/common';
import {
  FlavourPrismaRepository,
  PersonalizationPrismaRepository,
  SizePrismaRepository,
} from 'src/infra/orm/repositories';
import {
  findFlavoursFactory,
  findPersonalizationsFactory,
  findSizesFactory,
} from 'src/main/factories/usecases';

@Module({
  providers: [
    PersonalizationPrismaRepository,
    FlavourPrismaRepository,
    SizePrismaRepository,

    findPersonalizationsFactory,
    findFlavoursFactory,
    findSizesFactory,
  ],
  exports: [findPersonalizationsFactory, findFlavoursFactory, findSizesFactory],
})
export class FactoryModule {}
