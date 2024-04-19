import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {HttpClient} from './HttpClient';

export class Api extends HttpClient {
  private static classInstance?: Api;
  private static baseUrl: string = `https://api-v2.epackbook.in`;

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
    console.info('Method-', 'Post');
    console.info('Uri-', uri);
    console.info('Payload-', JSON.stringify(data));
    return this.instance.post<T, AxiosResponse<R>>(uri, data);
  };

  // ** GET **
  public get = async <R>(uri: string): Promise<R> => {
    console.info('Method-', 'Get');
    console.info('Uri-', uri);
    return this.instance.get<R>(uri);
  };

  // ** GET with body **
  public getWithBody = async <R,D>(uri: string, data: D): Promise<R> => {
    console.info('Method-', 'Get');
    console.info('Uri-', uri);
    const config:AxiosRequestConfig = {
      data: data,
    }
    return this.instance.get<R>(uri, config);
  };

  // ** PATCH **
  public update = async <T, R>(data: T, uri: string): Promise<R> => {
    console.info('Method-', 'Patch');
    console.info('Uri-', uri);
    console.info('Payload-', JSON.stringify(data));
    return this.instance.patch<T, AxiosResponse<R>>(uri, data);
  };

  // ** DELETE **
  public delete = async <T, R>(data: T, uri: string): Promise<R> => {
    console.info('Method-', 'Delete');
    console.info('Uri-', uri);
    console.info('Payload-', JSON.stringify(data));
    return this.instance.delete<T, AxiosResponse<R>>(uri);
  };

    // ** GET API for Pincode Only
    public getPostalAddress = async <TResponse>(
      url: string,
      config: RequestInit = {},
    ): Promise<TResponse> => {
      return fetch(url, config)
        .then(res => res.json())
        .then(data => data as TResponse);
    };
}
