import { OrderItemModel } from 'src/domain/models';

export interface CreateOrderItemRepository {
  create(
    parameters: CreateOrderItemRepository.Parameters,
    transaction?: CreateOrderItemRepository.Transaction,
  ): Promise<CreateOrderItemRepository.Result>;
}

export namespace CreateOrderItemRepository {
  export type Parameters = Omit<
    OrderItemModel,
    'id' | 'order' | 'size' | 'flavour' | 'personalizations'
  >;
  export type Transaction = unknown;
  export type Result = Omit<
    OrderItemModel,
    'order' | 'size' | 'flavour' | 'personalizations'
  >;
}
