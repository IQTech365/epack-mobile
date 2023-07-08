import {AxiosResponse} from 'axios';
import {HttpClient} from './HttpClient';

export class Api extends HttpClient {
  private static classInstance?: Api;
  private static baseUrl: string = `/api/v1`;

  private constructor() {
    super(Api.baseUrl);
  }

  public static getInstance = () => {
    if (!this.classInstance) {
      this.classInstance = new Api();
    }
    return this.classInstance;
  };

  // ** POST **
  public post = async <T, R>(data: T, uri: string) => {
    return this.instance.post<T, AxiosResponse<R>>(uri, data);
  }

  // ** GET **
  public get = async <R>(uri: string) => {
    return this.instance.get<AxiosResponse<R>>(uri);
  }

  // ** GET API for Pincode Only
  public getPostalAddress = async <TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> => {
    return fetch(url, config).then(res => res.json()).then(data => data as TResponse);
  }
}
