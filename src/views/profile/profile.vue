<template>
  <div id="profile">
    <Nav-bar class="profile-nav">
      <div slot="center" >个人信息</div>
    </Nav-bar>
    <!-- 注册信息展示 -->
    <my-user-info/>
    
    <!-- 个人积分信息展示 -->
    <section class="account">
      <div class="account-item">
        <div>
          <span class="account-item-count">0.00</span>
          <span class="item-info">元</span>
        </div>
        <div class="item-info">我的余额</div>
      </div>
      <div class="account-item">
        <div>
          <span class="account-item-count">0</span>
          <span>个</span>
        </div>
        <div class="item-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div>
          <span class="account-item-count">0</span>
          <span >分</span>
        </div>
        <div class="item-info">我的积分</div>
      </div>
    </section>

    <!-- 列表展示 -->
    <my-list-view :list="orderList" />
    <my-list-view :list="serviceList" />

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import UserInfo from './childComps/UserInfo'
import MyUserInfo from './myChildComps/MyUserInfo'
import MyListView from './myChildComps/MyListView'

  export default {
    components:{
      NavBar,
      UserInfo,
      MyUserInfo,
      MyListView
    },
    data(){
      return {
        orderList: [
          {info: '我的消息'},
          {info: '积分商城'},
          {info: '会员卡'},
        ],
        serviceList: [
          { info: '我的购物车'},
          { info: '下载购物APP'},
        ]
      }
    }
  }
</script>

<style scoped>
#profile{
  background-color: #f2f2f2;
}
.profile-nav{
  background-color: var(--color-tint);
  font-weight: 800;
  color: #fff
}

.account{
  display: flex;
}

.account-item{
  padding: 15px;
  flex: 1;
  text-align: center;
  margin-right: 1px;
  background-color: #fff;
}

.account-item-count{
  display: inline-block;
  margin-bottom: 5px;
  margin-right: 3px;
  font-size: 25px;
  font-weight: 900;
  color: orange;
}

.item-info{
  font-size: 15px
}


.list-view{
  background-color: #fff;
  margin-top: 10px;
}
.list-view-item{
  height: 44px;
  line-height: 44px;
}
.list-view-item span{
  display: inline-block;
  border-bottom: 2px solid #f2f2f2 ;
  width: 100%
}
</style>
