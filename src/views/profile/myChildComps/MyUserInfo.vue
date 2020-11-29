<template>
    <div class="user-info">
      <a href="#" class="user-link">
        <div class="user-info-img">
          <img src="~assets/img/profile/timg.jpg" alt="">
        </div>
        <div class="user-info-right">
          <div class="login-info">注册/登录</div>
          <div class="phone">暂无绑定手机号</div>
        </div>
        <div class="user-info-rightIcon">></div>
      </a>
    </div>
</template>

<script>
export default {
    name:"MyUserInfo"
    
}
</script>

<style scoped>
.user-info{
  background-color:var(--color-tint);
  padding: 15px;
}
.user-info a{
  display: flex
}
.user-info-img{
  
}
.user-info-img img{
  width: 60px;
  height: 60px;
  border-radius: 28px;
}
.user-info-right{
  text-align: left;
  width: 75%;
  color: #fff;
  margin: auto 10px;
}
.login-info{
  font-size: 18px;
}
.phone{
  font-size: 12px;
}
.user-info-rightIcon{
  color: #fff;
  margin: auto
}
</style>

