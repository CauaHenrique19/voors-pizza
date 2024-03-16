import { OrderItemModel } from 'src/domain/models';

export interface OrderModel {
  id: number;
  total: number;
  totalPreparationTime: number;
  createdAt: Date;

  itens: OrderItemModel[];
}
