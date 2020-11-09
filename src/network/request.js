import axios from 'axios'

export function request(config){

  //创建axios实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000/api/h8',
    timeout:5000
  })

  //创建axios请求拦截器
  instance.interceptors.request.use(config =>{
    console.log(config)
    return config
  },err => {
    console.log(err)
  })

  //创建axios响应拦截器
  instance.interceptors.response.use( res =>{
    console.log(res)
    return res.data
  },err =>{
    console.log(err)
  })

  //将实例return出去
  return instance(config)

}
