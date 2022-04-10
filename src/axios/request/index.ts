import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import type { IAxiosRequestConfig, Interceptors } from '@/axios/request/type'
// import { ElLoading } from 'element-plus'

class AxiosRequest {
  instance: AxiosInstance
  interceptors?: Interceptors

  constructor(config: IAxiosRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    //全部实例都安装的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('全局的拦截')
        return config
      },
      (err) => {
        console.log('全局的失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('全局的请求返回拦截成功')
        return res
      },
      (err) => {
        console.log('全局的请求返回拦截失败')
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

  request<T>(config: IAxiosRequestConfig<T>): Promise<T> {
    //请求拦截前处理
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise((resolve) => {
      this.instance.request<T>(config).then((response) => {
        //请求成功后的拦截
        if (config.interceptors?.responseInterceptor) {
          response = config.interceptors.responseInterceptor(response)
        }
        resolve(response.data)
      })
    })
  }
}

export default AxiosRequest
