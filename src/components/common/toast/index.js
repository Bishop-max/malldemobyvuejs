//将toast组件导入
import Toast from './Toast'

const obj = {}

/**
 * vue安装完成后会执行该插件的install函数
 * 所以需要在插件中定义一个Install函数
 * vue在执行install方法时默认将vue传入install函数
 */

obj.install = function(Vue){
    console.log("执行")
    //1.创建组件构造器
    const toastContrustor = Vue.extend(Toast)

    //2.new的方式，根据组件构造器，创建一个组件对象
    const toast = new toastContrustor()

    //3.将组件对象，手动挂载到某一元素上
    toast.$mount(document.createElement('div'))

    //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = toast
}

export default obj
