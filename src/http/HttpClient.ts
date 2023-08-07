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
    const authToken = await getAuthToken();
    console.log('authToken----', authToken);
    if(authToken) {
      //@ts-ignore
      config.headers['Authorization'] = authToken;
    }
    return config;
  } 

  private _handleResponse = ({data}: AxiosResponse) => data; 

  private _handleError = (error: any) => Promise.reject(error);
}
