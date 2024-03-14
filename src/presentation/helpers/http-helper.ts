import { ServerError } from 'src/presentation/errors';
import { HttpResponse } from 'src/presentation/protocols';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
  name: error?.name,
});

export const notFound = (): HttpResponse => ({
  body: null,
  statusCode: 404,
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const createdSuccess = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});
