import { OrderItemModel, OrderModel } from 'src/domain/models';

export interface FindOrderByIdUseCase {
  find(
    parameters: FindOrderByIdUseCase.Parameters,
  ): Promise<FindOrderByIdUseCase.Result>;
}

export namespace FindOrderByIdUseCase {
  export type Parameters = { id: number };
  export type Result = Omit<OrderModel, 'itens'> & {
    itens: Omit<OrderItemModel, 'order'>[];
  };
}
