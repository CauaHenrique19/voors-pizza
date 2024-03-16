import { SizeModel } from 'src/domain/models';

export interface FindSizeByIdRepository {
  findById(
    parameters: FindSizeByIdRepository.Parameters,
  ): Promise<FindSizeByIdRepository.Result>;
}

export namespace FindSizeByIdRepository {
  export type Parameters = { id: number | number[] };
  export type Result = SizeModel | SizeModel[];
}
