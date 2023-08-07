import {AxiosResponse} from 'axios';
import {HttpClient} from './HttpClient';

export class Api extends HttpClient {
  private static classInstance?: Api;
  // private static baseUrl: string = `http://localhost:5000/api/v1`;
  private static baseUrl: string = `http://65.1.119.247/api/v1`;
  // private static baseUrl: string = `http://10.0.2.2:5000/api/v1`;

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
  public post = async <T, R>(data: T, uri: string): Promise<R> => {
    return this.instance.post<T, AxiosResponse<R>>(uri, data);
  }

  // ** GET **
  public get = async <R>(uri: string): Promise<R> => {
    return this.instance.get<R>(uri);
  }

  // ** PATCH **
  public update = async <T, R>(data: T, uri: string): Promise<R> => {
    return this.instance.patch<T, AxiosResponse<R>>(uri, data);
  }

  // ** GET API for Pincode Only
  public getPostalAddress = async <TResponse>(url: string, config: RequestInit = {}): Promise<TResponse> => {
    return fetch(url, config).then(res => res.json()).then(data => data as TResponse);
  }
}
