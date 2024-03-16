import { OrderItemModel, OrderModel } from 'src/domain/models';

export interface FindOrderByIdRepository {
  find(
    parameters: FindOrderByIdRepository.Parameters,
  ): Promise<FindOrderByIdRepository.Result>;
}

export namespace FindOrderByIdRepository {
  export type Parameters = { id: number };
  export type Result = Omit<OrderModel, 'itens'> & {
    itens: Omit<OrderItemModel, 'order'>[];
  };
}
