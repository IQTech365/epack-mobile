import {AxiosResponse} from 'axios';
import {HttpClient} from './HttpClient';

export class Api extends HttpClient {
  private static classInstance?: Api;
  // private static baseUrl: string = `http://localhost:5000/api/v1`;
  private static baseUrl: string = `http://43.204.120.38:3000`;
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

  // ** Create Order_id on Server before `Razorpay Payment`
  public createOrder = async <R>(order_amount: number): Promise<R> => {
    const kyeId = `rzp_test_Dl3dSM01ZoLIgz`;
    const keySecret = `FIxbbAQZxuOh2It12i2FKSK8`;
    const url = `https://api.razorpay.com/v1/orders`;
    const data = {
      amount: order_amount,
      currency: 'INR',
    };
    // const auth = 'Basic ' + new Buffer(kyeId + ':' + keySecret).toString('base64');
    const config: RequestInit = {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + btoa(`${kyeId}:${keySecret}`),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return fetch(url, config)
      .then(res => res.json())
      .then(data => data as R);
  };
}
