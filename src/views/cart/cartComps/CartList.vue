<template>
  <div class="cart-list">
    <Scroll class="content" ref="cartScroll">
      <CartListItem v-for="(item,index) in cartList" :key="index" :product="item"/>
    </Scroll>
    <!-- <h1>cartlist</h1> -->
  </div>
</template>

<script>
  /**
   * 导入better-scroll
   *
   */
import Scroll from 'common/scroll/Scroll'

import CartListItem from './CartListItem'

import { mapGetters } from "vuex"

  export default {
    components:{
       Scroll,
       CartListItem
    },
    computed:{
      ...mapGetters(['cartList'])
    },
    activated(){
      this.$refs.cartScroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list{
    height: calc(100% - 133px);
  }
  .content{
    height: 100%;
    overflow: hidden;
  }
</style>
