import { FindFlavoursUseCase } from 'src/domain/usecases';
import { FindFlavoursController } from 'src/presentation/controllers';
import { notFound, ok, serverError } from 'src/presentation/helpers';
import { makeFakeFlavours } from 'test/data/usecases/flavour/find-flavours.spec';

const fakeFlavours = makeFakeFlavours();

const makeFindFlavours = () => {
  class FindFlavoursStub implements FindFlavoursUseCase {
    async find(): Promise<FindFlavoursUseCase.Result> {
      return new Promise((resolve) => resolve(fakeFlavours));
    }
  }

  return new FindFlavoursStub();
};

export interface sutTypes {
  sut: FindFlavoursController;
  findFlavoursStub: FindFlavoursUseCase;
}

const makeSut = (): sutTypes => {
  const findFlavoursStub = makeFindFlavours();
  const sut = new FindFlavoursController(findFlavoursStub);

  return {
    sut,
    findFlavoursStub,
  };
};

describe('Find Flavours Controller', () => {
  test('Should call find flavours use case', async () => {
    const { sut, findFlavoursStub } = makeSut();
    const finFlavoursSpy = jest.spyOn(findFlavoursStub, 'find');

    await sut.handle();
    expect(finFlavoursSpy).toHaveBeenCalledWith();
  });

  test('Should return 200 if flavours has been returned', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(ok(fakeFlavours));
  });

  test('Should return 404 if not found flavours', async () => {
    const { sut, findFlavoursStub } = makeSut();
    jest
      .spyOn(findFlavoursStub, 'find')
      .mockReturnValueOnce(new Promise((resolve) => resolve([])));

    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(notFound());
  });

  test('Should return 500 if findFlavours throws', async () => {
    const { sut, findFlavoursStub } = makeSut();
    jest.spyOn(findFlavoursStub, 'find').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await sut.handle();
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
