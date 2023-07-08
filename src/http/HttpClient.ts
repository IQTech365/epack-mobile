import axios, {AxiosInstance, AxiosResponse} from 'axios';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T>{}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseUrl: string) {
    this.instance = axios.create({baseURL: baseUrl});
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  }

  private _handleResponse = ({data}: AxiosResponse) => data; 

  private _handleError = (error: any) => Promise.reject(error);
}
