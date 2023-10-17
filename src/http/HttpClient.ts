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
    // const authToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTBlZmIyZDdlMzk2OGM0YzIxN2EzNGYiLCJpZCI6IjY1MGVmYjJkN2UzOTY4YzRjMjE3YTM0ZiIsImlhdCI6MTY5NTg4MTg2MiwiZXhwIjoxNjk1OTY4MjYyfQ.mLJFzj0gM1tR_7dr0o0XPXODGH5mA5KCGLGvDyw6QnQ`;
    console.log('authToken----', authToken);
    if(authToken) {
      //@ts-ignore
      config.headers['token'] = authToken;
    }
    if(config.data instanceof FormData) {
      //@ts-ignore
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  } 

  private _handleResponse = ({data}: AxiosResponse) => data; 

  private _handleError = (error: any) => Promise.reject(error);
}
