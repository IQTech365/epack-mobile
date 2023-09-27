import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { getAuthToken } from '../utils/storage';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T>{}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseUrl: string) {
    this.instance = axios.create({baseURL: baseUrl});
    this._initializeRequestInterceptor();
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private _initializeRequestInterceptor = () => {
    //@ts-ignore
    this.instance.interceptors.request.use(this._handleRequest, this._handleError)
  }

  private _handleRequest = async (config: AxiosRequestConfig) => {
    // const authToken = await getAuthToken();
    const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTBlZmIyZDdlMzk2OGM0YzIxN2EzNGYiLCJpZCI6IjY1MGVmYjJkN2UzOTY4YzRjMjE3YTM0ZiIsImlhdCI6MTY5NTc5NjA2MSwiZXhwIjoxNjk1ODgyNDYxfQ.Gnye7M9JpL3ZZ4ltIqViZOKD0Yx4qeCakYSR_VnhPeY`;
    console.log('authToken----', authToken);
    if(authToken) {
      //@ts-ignore
      config.headers['token'] = authToken;
    }
    console.log('HttpClient-data-', JSON.stringify(config.data));
    // if(config.data.logo) {
    //   //@ts-ignore
    //   config.headers['Content-Type'] = "multipart/form-data";
    // }
    return config;
  } 

  private _handleResponse = ({data}: AxiosResponse) => data; 

  private _handleError = (error: any) => Promise.reject(error);
}
