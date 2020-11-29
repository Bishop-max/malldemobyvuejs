<template>
    <div class="list-view">
      <div class="list-view-item" v-for="(item,index) in list" :key="index">
        <img src="" alt="">
        <span>{{item.info}}</span>
      </div>
    </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array,
            default:[]
        }
    }
}
</script>

<style scoped>
.list-view{
  background-color: #fff;
  margin-top: 10px;
}
.list-view-item{
  height: 44px;
  line-height: 44px;
  font-size: 14px
}
.list-view-item span{
  display: inline-block;
  border-bottom: 2px solid #f2f2f2 ;
  width: 100%
}
</style>
