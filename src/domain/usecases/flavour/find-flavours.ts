import { FlavourModel } from 'src/domain/models';

export interface FindFlavoursUseCase {
  find(): Promise<FindFlavoursUseCase.Result>;
}

export namespace FindFlavoursUseCase {
  export type Result = FlavourModel[];
}
