<template>
  <NavBar>
    <div slot="left" class="left" @click="backclick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="center">
      <div v-for="(item,index) in titles" class="center-item" :class="{active: index === currentIndex}" @click="itemClick(index)"><span>{{item}}</span></div>
    </div>
  </NavBar>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'

  export default {
    data(){
      return {
        titles:['商品','参数','评论','推荐'],
        //当前被点击的是哪个index
        currentIndex:0
      }
    },
    components:{
      NavBar
    },
    methods:{
      //监听centeritem点击，将被点击的文字字体颜色改变
      itemClick(index){
        this.currentIndex = index
        
        //向detail组件发射点击切换到对应位置的事件
        this.$emit('titleClick',index)
      },
      //返回上一页
      backclick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .left{
    margin-top: 3px;
  }
  .center{
    display: flex;
  }
  .center-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
</style>
