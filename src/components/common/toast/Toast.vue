<template>
  <div class="toast" v-show="isShow">
     <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name:"Toast",
    // props:{
    //   message:{
    //     type:String,
    //     default:'哈哈哈'
    //   },
    //   isShow:{
    //     type:Boolean,
    //     default:false
    //   }
    // },
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      show(message,duration){
        this.isShow = true
        this.message = message

        setTimeout(() =>{
          this.isShow = false
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 8px 10px;
    transform: translate(-50%,-50%);
    border-radius: 8%;

    z-index: 999;

    color: #FFFFFF;
    background-color: rgba(0,0,0,.6);
  }
</style>
