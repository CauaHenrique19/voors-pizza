import { Module } from '@nestjs/common';
import { PersonalizationPrismaRepository } from 'src/infra/orm/repositories';
import { findPersonalizationsFactory } from 'src/main/factories/usecases';

@Module({
  providers: [PersonalizationPrismaRepository, findPersonalizationsFactory],
  exports: [findPersonalizationsFactory],
})
export class FactoryModule {}
