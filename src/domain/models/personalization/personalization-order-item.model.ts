import { PersonalizationModel } from 'src/domain/models';

export interface PersonalizationOrderItemModel {
  id: number;
  orderItemId: number;
  personalizationId: number;
  createdAt: Date;

  personalization: PersonalizationModel;
}
