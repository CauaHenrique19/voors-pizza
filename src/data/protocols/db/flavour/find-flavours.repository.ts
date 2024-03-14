import { FlavourModel } from 'src/domain/models';

export interface FindFlavoursRepository {
  find(): Promise<FindFlavoursRepository.Result>;
}

export namespace FindFlavoursRepository {
  export type Result = FlavourModel[];
}
