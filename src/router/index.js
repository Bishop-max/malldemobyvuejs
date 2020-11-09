import Vue from 'vue'
import Router from 'vue-router'

//导入相关组件
const Home = () => import('@/views/home/home')
const Category = () => import('@/views/category/category')
const Cart = () => import('@/views/cart/cart')
const Profile = () => import('@/views/profile/profile')

//安装router
Vue.use(Router)

//创建router实例

const router = new Router({
  mode:'history',
  routes:[
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/home',
      component:Home
    },
    {
      path:'/category',
      component:Category
    },
    {
      path:'/cart',
      component:Cart
    },
    {
      path:'/profile',
      component:Profile
    }
  ]
})

//导出router实例
export default router
