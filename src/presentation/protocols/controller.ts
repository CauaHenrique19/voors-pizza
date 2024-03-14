import { HttpResponse } from 'src/presentation/protocols';

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>;
}
