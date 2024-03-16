import { SizesNotFoundError } from 'src/domain/errors';
import { FindSizesUseCase } from 'src/domain/usecases';
import { FindSizesController } from 'src/presentation/controllers';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { makeFakeSizes } from 'test/data/usecases/size/find-sizes.spec';

const fakeSizes = makeFakeSizes();

const makeFindSizes = () => {
  class FindSizesStub implements FindSizesUseCase {
    async find(): Promise<FindSizesUseCase.Result> {
      return new Promise((resolve) => resolve(fakeSizes));
    }
  }

  return new FindSizesStub();
};

export interface sutTypes {
  sut: FindSizesController;
  findSizesStub: FindSizesUseCase;
}

const makeSut = (): sutTypes => {
  const findSizesStub = makeFindSizes();
  const sut = new FindSizesController(findSizesStub);

  return {
    sut,
    findSizesStub,
  };
};

describe('Find Sizes Controller', () => {
  test('Should call find sizes use case', async () => {
    const { sut, findSizesStub } = makeSut();
    const findSizesSpy = jest.spyOn(findSizesStub, 'find');

    await sut.handle();
    expect(findSizesSpy).toHaveBeenCalledWith();
  });

  test('Should return 200 if sizes has been returned', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(fakeSizes));
  });

  test('Should return 404 if not found sizes', async () => {
    const { sut, findSizesStub } = makeSut();

    const error = new SizesNotFoundError();
    jest.spyOn(findSizesStub, 'find').mockImplementationOnce(() => {
      throw error;
    });

    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(notFound(error));
  });

  test('Should return 500 if size throws', async () => {
    const { sut, findSizesStub } = makeSut();
    jest.spyOn(findSizesStub, 'find').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
