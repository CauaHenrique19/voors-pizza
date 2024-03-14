import { Controller, HttpResponse } from 'src/presentation/protocols';

export const controllerAdapter = async (
  controller: Controller,
  data?: any,
): Promise<HttpResponse> => {
  return controller.handle(data);
};
