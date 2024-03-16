import { Provider } from '@nestjs/common';
import { FIND_ORDER_BY_ID_FACTORY } from 'src/main/factories/providers';
import { FindOrderByIdUseCase } from 'src/domain/usecases';
import { OrderPrismaRepository } from 'src/infra/orm/repositories';
import { FindOrderById } from 'src/data/usecases';

export const findOrderByIdFactory: Provider = {
  provide: FIND_ORDER_BY_ID_FACTORY,
  useFactory: (
    orderPrismaRepository: OrderPrismaRepository,
  ): FindOrderByIdUseCase => {
    return new FindOrderById(orderPrismaRepository);
  },
  inject: [OrderPrismaRepository],
};
