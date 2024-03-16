import { Module } from '@nestjs/common';
import {
  FlavourPrismaRepository,
  OrderItemPrismaRepository,
  OrderPrismaRepository,
  PersonalizationOrderItemPrismaRepository,
  PersonalizationPrismaRepository,
  SizePrismaRepository,
} from 'src/infra/orm/repositories';
import {
  createOrderFactory,
  findFlavoursFactory,
  findPersonalizationsFactory,
  findSizesFactory,
} from 'src/main/factories/usecases';
import { PrismaTransactionManager } from 'src/infra/orm/transaction-manager';

@Module({
  providers: [
    PrismaTransactionManager,

    PersonalizationPrismaRepository,
    FlavourPrismaRepository,
    SizePrismaRepository,
    OrderPrismaRepository,
    OrderItemPrismaRepository,
    PersonalizationOrderItemPrismaRepository,

    findPersonalizationsFactory,
    findFlavoursFactory,
    findSizesFactory,
    createOrderFactory,
  ],
  exports: [
    findPersonalizationsFactory,
    findFlavoursFactory,
    findSizesFactory,
    createOrderFactory,
  ],
})
export class FactoryModule {}
