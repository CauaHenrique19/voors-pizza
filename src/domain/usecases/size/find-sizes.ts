import { SizeModel } from 'src/domain/models';

export interface FindSizesUseCase {
  find(): Promise<FindSizesUseCase.Result>;
}

export namespace FindSizesUseCase {
  export type Result = SizeModel[];
}
