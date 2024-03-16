import { SizeModel } from 'src/domain/models';

export interface FindSizesRepository {
  find(): Promise<FindSizesRepository.Result>;
}

export namespace FindSizesRepository {
  export type Result = SizeModel[];
}
