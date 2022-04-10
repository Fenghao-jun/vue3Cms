import AxiosRequest from '@/axios/request/index.ts'

const instance = new AxiosRequest({
  baseURL: 'http://127.0.0.1/:8888',
  interceptors: {
    requestInterceptor(config) {
      console.log(config, '实例请求拦截')
      return config
    }
  }
})

export default instance
