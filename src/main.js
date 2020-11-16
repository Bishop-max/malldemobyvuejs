import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入vuex
import store from './vuex'
//导入自封装的toast插件
import toast from 'components/common/toast'
//导入fastclick
import FastClick from 'fastclick'
//导入vue-lazyload图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

//创建事件总线$bus(Vue实例),可由1组件向非父组件的2组件发射事件
Vue.prototype.$bus = new Vue()

//初始化fastclick实例
FastClick.attach(document.body)

//安装toast插件
Vue.use(toast)

//使用vue-lazyload
Vue.use(VueLazyload,{
  loading:require('./assets/img/common/loading.gif')
})

new Vue({
  render: h => h(App),
  router,
  //挂载vuex
  store,
}).$mount('#app')
