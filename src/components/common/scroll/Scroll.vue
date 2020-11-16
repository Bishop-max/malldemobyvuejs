<template>
  <!-- 通过ref来获取元素对象 -->
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  /**
   * 对better-scroll进行封装
   */
  //1.导入better-scroll
  import BScroll from 'better-scroll'
  export default {
    props:{
      //由父组件传入侦听类型
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        scroll:null
      }
    },
    mounted(){
      //通过ref 获取元素对象，避免重名class问题
      //1.创建better-scroll实例
      this.scroll = new BScroll(this.$refs.wrapper,{
        //div或组件的点击生效必要要设置click:true
        click:true,
        //由父组件决定是否监听滚动
        probeType:this.probeType,
        //是否监听上拉加载
        pullUpLoad:this.pullUpLoad
      })

      //2.监听滚动位置
      this.scroll.on('scroll',(position) =>{
        //向父组件发射事件并传当前位置
        this.$emit('scroll',position)
      })
      //3.监听上拉加载更多
      this.scroll.on('pullingUp',() =>{
          this.$emit('pullingUp')
      })
    },
    methods:{
      //对scrollTo方法进行封装
      scrollTo(x,y,time = 500){
        //scroll返回顶部
        console.log(this.probeType)
        //&&当this.scroll不为空时才调用scrollTo(x,y,time)方法，防止this.scroll为空的情况
        this.scroll && this.scroll.scrollTo(x,y,time)
      },

      //scroll刷新内容高度
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      //scroll结束上拉加载
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },

      //scroll当前滚动的高度y
      getScrollY(){
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
</style>
