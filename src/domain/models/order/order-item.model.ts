import { FlavourModel, SizeModel, OrderModel } from 'src/domain/models';

export interface OrderItemModel {
  id: number;
  orderId: number;
  sizeId: number;
  flavourId: number;
  createdAt: Date;

  order: OrderModel;
  size: SizeModel;
  flavour: FlavourModel;
}
