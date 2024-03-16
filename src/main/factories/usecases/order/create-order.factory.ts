import { Provider } from '@nestjs/common';
import { CREATE_ORDER_FACTORY } from 'src/main/factories/providers';
import {
  FlavourPrismaRepository,
  OrderItemPrismaRepository,
  OrderPrismaRepository,
  PersonalizationOrderItemPrismaRepository,
  PersonalizationPrismaRepository,
  SizePrismaRepository,
} from 'src/infra/orm/repositories';
import { CreateOrder } from 'src/data/usecases';
import { PrismaTransactionManager } from 'src/infra/orm/transaction-manager';

export const createOrderFactory: Provider = {
  provide: CREATE_ORDER_FACTORY,
  useFactory: (
    flavourPrismaRepository: FlavourPrismaRepository,
    sizePrismaRepository: SizePrismaRepository,
    personalizationPrismaRepository: PersonalizationPrismaRepository,
    orderPrismaRepository: OrderPrismaRepository,
    orderItemPrismaRepository: OrderItemPrismaRepository,
    personalizationOrderItemPrismaRepository: PersonalizationOrderItemPrismaRepository,
    prismaTransactionManager: PrismaTransactionManager,
  ) => {
    return new CreateOrder(
      flavourPrismaRepository,
      sizePrismaRepository,
      personalizationPrismaRepository,
      orderPrismaRepository,
      orderItemPrismaRepository,
      personalizationOrderItemPrismaRepository,
      prismaTransactionManager,
    );
  },
  inject: [
    FlavourPrismaRepository,
    SizePrismaRepository,
    PersonalizationPrismaRepository,
    OrderPrismaRepository,
    OrderItemPrismaRepository,
    PersonalizationOrderItemPrismaRepository,
    PrismaTransactionManager,
  ],
};
