import {debounce} from './utils.js'
import BackTop from '@/components/content/backtop/BackTop'

//监听详情页和首页goodslistitem的加载完成的混入
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener:null
    }
  },

  mounted(){
    //在元素挂载完成后再进行监听，否则有可能拿不到this.$refs.scroll
    //1.监听Goodslistitem图片加载完成
    // this.$bus.$on('imgLoad',()=>{
    //   //刷新当前内容高度
    //   this.$refs.scroll.refresh()
    // })
    console.log('我是混入')
    this.itemImgListener = () => {
      debounce(() =>{
        this.$refs.scroll.refresh()
      },500)
    }
    this.$bus.$on('imgLoad',this.itemImgListener)
  }
}

//返回顶部的混入，把各个组件中的公共部分抽取出来
export const backTopMixin = {
  data(){
    return {
      isShowBackTop:false
    }
  },

  components:{
    BackTop
  }
}
