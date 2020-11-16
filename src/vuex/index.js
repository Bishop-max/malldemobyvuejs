//导入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

//安装vuex
Vue.use(Vuex)

//创建vuex实例
const store = new Vuex.Store({
  //状态，用于存储
  state:{
    cartList:[]
  },
  //用于处理异步操作，异步操作可以通过promise来处理
  //复杂的代码处理也在此进行
  actions:{
    addCart(context,payload){
      return new Promise((resolve,reject) => {
        //let oldProduct = null;
        //判断新添加的商品是否已在列表中
        //存在bug，列表渲染不能实时刷新
        // for(let item of state.cartList){
        //   if(item.iid === payload.iid){
        //     oldProduct = item
        //   }
        // }
        //该方法可实时刷新
        let oldProduct = context.state.cartList.find( item => item.iid === payload.iid)

        //为cartlist对象添加count属性，用于记录添加的个数
        if(oldProduct){
          //oldProduct.count += 1
          context.commit('addCounter',oldProduct)
          resolve('商品数量+1')
        }else{
          payload.count = 1
          // Vue.set(payload,"count",1)
          // Vue.set(payload,"check",true)
          //state.cartList.push(payload)
          //为添加的商品添加默认选中属性
          payload.check = true
          context.commit('addToCart',payload)
          resolve("添加新的商品成功")
        }
      })

    }
  },
  //用于处理同步操作
  //专门负责改变状态
  mutations:{
    addCounter(state,payload){
      payload.count +=1
    },
    addToCart(state,payload){
      state.cartList.push(payload)
    }
  },
  //类似于计算属性
  getters:{
    cartLength(state){
      return state.cartList.length
    },
    cartList(state){
      return state.cartList
    }
  },
  //
  modules:{}
})

//导出vuex实例
export default store
