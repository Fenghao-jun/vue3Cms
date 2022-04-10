import type { AxiosRequestConfig } from 'axios'
import { AxiosResponse } from 'axios'

interface IAxiosRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>
}

interface Interceptors<T = any> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (config: any) => any
  responseInterceptor?: (config: AxiosResponse<T>) => AxiosResponse<T>
  responseInterceptorCatch?: (config: any) => any
}

export { IAxiosRequestConfig, Interceptors }
