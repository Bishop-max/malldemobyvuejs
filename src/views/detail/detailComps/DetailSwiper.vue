<template>
  <Swiper class="detail-swiper">
    <Swiper-item v-for="item in topImg">
      <img :src="item" alt="">
    </Swiper-item>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper'

  export default {
    props:{
      //轮播图数据
      topImg:{
        type:Array,
        default(){
          return []
        }
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    created(){
      console.log(this.topImg)
    }
  }
</script>

<style scoped>
  .detail-swiper{
    height: 500px;
    overflow: hidden;
  }
</style>
