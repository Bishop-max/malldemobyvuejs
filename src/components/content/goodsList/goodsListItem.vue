<template>
  <div class="goods-list-item" @click="itemClick">
      <!-- vue封装了@load事件 图片加载完成时调用imgLoad -->
      <!-- 原生js有img.onload函数，图片加载完成时调用 -->
      <img v-lazy="showImg" alt="" @load="imgLoad">
      <div class="goods-info">
        <p>{{goodsitem.title}}</p>
        <span class="price">{{goodsitem.price}}</span>
        <span class="collect">{{goodsitem.cfav}}</span>
      </div>
  </div>
</template>

<script>
  export default {
    computed:{
      showImg(){
        //根据数据展示首页的goodslist或者推荐的goodslist
        return  this.goodsitem.img || this.goodsitem.image || this.goodsitem.show.img
      }
    },
    methods:{
      imgLoad(){
        //通过事件总线向非父组件发射事件,目标对象通过this.$bus.$on('imgLoad',() => {})接受
        // this.$bus.$emit('imgLoad')

        //两种方案
        if(!this.$route.path.indexOf('/home')){
          console.log("homegoodslistitem")
          this.$bus.$emit('homeImgLoad')
        }else if(!this.$route.path.indexOf('/detail')){
          console.log("detailgoodslistitem")
          this.$bus.$emit('detailImgLoad')
        }else if(!this.$route.path.indexOf('/category')){
          this.$bus.$emit('categoryImgLoad')
        }

      },
      itemClick(){
        this.$router.push('/detail/'+this.goodsitem.iid)
      }
    },
    props:{
      goodsitem:{
        type:Object,
        default(){
          return {

          }
        }
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {

    width: 48%;

    padding-bottom: 40px;
    position: relative;
  }
  .goods-list-item img {
    width: 100%;
    border-radius:10px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
