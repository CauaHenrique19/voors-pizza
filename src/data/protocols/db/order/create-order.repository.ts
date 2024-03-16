import { OrderModel } from 'src/domain/models';

export interface CreateOrderRepository {
  create(
    parameters: CreateOrderRepository.Parameters,
    transaction?: CreateOrderRepository.Transaction,
  ): Promise<CreateOrderRepository.Result>;
}

export namespace CreateOrderRepository {
  export type Parameters = Omit<OrderModel, 'id' | 'itens'>;
  export type Transaction = unknown;
  export type Result = Omit<OrderModel, 'itens'>;
}
