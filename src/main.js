import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//创建事件总线$bus(Vue实例),可由1组件向非父组件的2组件发射事件
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
