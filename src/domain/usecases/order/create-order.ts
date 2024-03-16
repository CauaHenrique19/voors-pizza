import { OrderItemModel, OrderModel } from 'src/domain/models';

export interface CreateOrderUseCase {
  create(
    parameters: CreateOrderUseCase.Parameters,
  ): Promise<CreateOrderUseCase.Result>;
}

export namespace CreateOrderUseCase {
  export type Parameters = {
    items: (Pick<OrderItemModel, 'sizeId' | 'flavourId'> & {
      personalizations?: number[];
    })[];
  };

  export type Result = Omit<OrderModel, 'itens'>;
}
