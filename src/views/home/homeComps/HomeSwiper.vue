<template>
  <Swiper>
    <SwiperItem v-for="item in banner">
      <a :href="item.link">
        <img :src="item.image" @load="swiperImgLoad">
      </a>
    </SwiperItem>
  </Swiper>
</template>

<script>
  import {Swiper, SwiperItem} from '@/components/common/swiper/index'
  export default {
    data:{
      isLoad:false
    },
    props:{
      banner:{
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
    methods:{
      swiperImgLoad(){
        if(!this.isLoad){
          this.$emit('swiperImgLoad')
          this.isLoad = true
        }
      }
    }
  }
</script>

<style>
</style>
