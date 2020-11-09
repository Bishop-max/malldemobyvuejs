<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" >
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      recommend:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style>
  .recommend{
    display: flex;
    width: 100%;
    font-size: 12px;
    text-align: center;


    padding: 10px 0 20px;
    border-bottom:10px solid #EEEEEE ;
  }

  .recommend-item{
    flex: 1;

  }

  .recommend-item img{
    width: 65px;
    height: 65px;
    margin-bottom: 10px;
  }
</style>
