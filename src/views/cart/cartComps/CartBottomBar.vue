<template>
  <div class="cart-bottom-bar">
    <!-- 全选 -->
    <div class="check-bottom">
      <CheckButton class="check-button" :is-check="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div class="price">合计：{{totalPrice}}</div>
    <!-- 去结算 -->
    <div class="calculate" @click="calcClick">结算({{checkLength}})</div>
  </div>
</template>

<script>
  /**
   * 导入vuex的getters辅助函数mapGetters
   */
  import { mapGetters } from 'vuex'

  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    components:{
      CheckButton
    },
    computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        return this.cartList.filter(item => {
          return item.check
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.cartList.filter(item => {
          return item.check
        }).length
      },
      isSelectAll(){
        if(this.cartList.length === 0) return false //判断购物车列表是否为空，空的情况下数组的高阶函数会返回一个undefined

        return !this.cartList.find(item => !item.check)
      }
    },
    methods:{
      //监听全选按钮点击
      checkClick(){
        //判断商品是否全部被选中
        if(this.isSelectAll){
          this.cartList.forEach(item => item.check = false)
        }else{
          this.cartList.forEach(item => item.check = true)
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请先添加商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar{
    height: 40px;
    position: relative;
    background-color: #CCCCCC;
    line-height: 40px;
    display: flex;
  }
  .check-bottom{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  }
  .check-button{
    width: 22px;
    height: 22px;
    line-height: 20px;
    margin-right: 8px;
  }
  .price{
    flex: 1;
    text-align: center;
  }
  .calculate{
    width: 80px;
    background-color: #FF4500;
    text-align: center;
    color: #FFFFFF;
  }
</style>
