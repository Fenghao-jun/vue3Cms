import axios, { AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import type { IMRequestConfig, InterceptorConfig } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/es/el-loading/src/loading.type'

const DEFAULT_LOADING = false

class MRequest {
  instance: AxiosInstance
  interceptors?: InterceptorConfig
  showLoading?: boolean
  loadingInstance?: ILoadingInstance

  constructor(config: IMRequestConfig) {
    //创建实例
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    //全部实例都安装的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: 'Loading...',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        this.loadingInstance?.close()
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loadingInstance?.close()
        return res
      },
      (err) => {
        this.loadingInstance?.close()
        return err
      }
    )

    //注册拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }

  //实例中的传入的config为AxiosRequestConfig类型
  //把实例改成拓展后的类型，这样可以方便我们对一些特殊请求进行数据处理
  request<T>(config: IMRequestConfig<T>): Promise<T> {
    return new Promise((resolve) => {
      //请求拦截前处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      //是否存在需要loading
      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }

      this.instance.request<T>(config).then((response) => {
        //请求成功后的拦截
        if (config.interceptors?.responseInterceptor) {
          response = config.interceptors.responseInterceptor(response)
          this.showLoading = DEFAULT_LOADING
        }
        resolve(response.data)
      })
    })
  }

  get<T = any>(config: IMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: IMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: IMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: IMRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MRequest
