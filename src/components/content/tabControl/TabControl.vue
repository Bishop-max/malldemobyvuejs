<template>
  <div class="tab-control">
    <div class="tab-control-item"
    v-for="(item,index) in titile"
    @click="itemClick(index)"
    :class="{active:currentIndex === index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        currentIndex:0
      }
    },
    props:{
      titile:{
        type:Array,
        default(){
          return []
        }
      }
    },
    methods:{
      //通过index获取哪一个item并记录
      itemClick(index){
        this.currentIndex = index;
        this.$emit('tabClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;

    background-color: #FFFFFF;

    /* 临时使用，会被better-scoll替换 */
    /* position: sticky;
    top: 44px; */

  }

  .tab-control-item{
    flex: 1;
  }

  .tab-control-item span{
    padding: 8px;
  }

  .active{
    color: var(--color-high-text);
  }

  .active span{
    border-bottom: 3px solid var(--color-high-text);
  }
</style>
