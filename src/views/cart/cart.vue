<template>
  <div class="cart">
    <!-- 导航 -->
    <NavBar class="cart-nav"><div slot="center">购物车({{cartLength}})</div></NavBar>
    <!-- 商品列表 -->
    <!-- <Scroll class="content"> -->
      <CartList />
    <!-- </Scroll> -->
    <!-- 底部汇总 -->
    <CartBottomBar/>
    <!-- <h1>购物车</h1> -->
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  /**
   * cart子组件
   */
  import CartList from './cartComps/CartList'
  import CartBottomBar from './cartComps/CartBottomBar'

  /**
   * 导入better-scroll
   *
   */
  // import Scroll from 'common/scroll/Scroll'

  import { mapGetters } from "vuex"
  export default {
    components:{
      NavBar,
      CartList,
      CartBottomBar
      /* // Scroll */
    },
    computed:{
      //getters简用的两种语法
      //1.
      // ...mapGetters({
      //   length:'cartLength'
      // })
      //2.
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
    /* position: relative; */
  }
  .cart-nav{
    background-color: var(--color-tint);
    color: #FFFFFF;
  }

  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
  } */
</style>
