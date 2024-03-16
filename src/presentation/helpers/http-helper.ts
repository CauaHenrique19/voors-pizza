import { ServerError } from 'src/presentation/errors';
import { HttpResponse } from 'src/presentation/protocols';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message,
  name: error?.name,
});

export const notFound = (error?: Error): HttpResponse => ({
  body: error?.message,
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
