<template>
  <div class="goods-list">
    <goods-list-item v-for="(item,index) in goodslist"
     :key="index"
     :goodsitem="item"/>
  </div>
</template>

<script>
  import GoodsListItem from './goodsListItem'
  export default {
    components:{
      GoodsListItem
    },
    props:{
      goodslist:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .goods-list{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   
   padding: 2px;
 }
</style>
