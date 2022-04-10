import type { AxiosRequestConfig, AxiosResponse } from 'axios'

interface InterceptorConfig<T = any> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (config: any) => any
  responseInterceptor?: (config: AxiosResponse<T>) => AxiosResponse<T>
  responseInterceptorCatch?: (config: any) => any
}

interface IMRequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: InterceptorConfig<T>
  showLoading?: boolean
}

export { InterceptorConfig, IMRequestConfig }
