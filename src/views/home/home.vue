<template>
  <div class="home">
    <Navbar class="homeNar">
      <div slot="center">购物街</div>
    </Navbar>
    <!-- 障眼法替代bscroll中tabcontrol无法吸顶的方案 -->
    <!-- v-show 是否显示，用于取代scroll无法完成的吸顶效果 -->
    <Tab-control
    :titile="['流行','新款','精选']"
    class="tab-control"
    ref="tabcontrol1"
    v-show="isTabFixed"
    @tabClick="tabClick" />

    <!-- 通过ref获取到scroll组件实例对象 -->
    <!-- probe-type向scroll子组件侦听类型 -->
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3" :pull-up-load="true" @pullingUp="loadMore">

      <HomeSwiper :banner="banner" @swiperImgLoad="swiperImgLoad"></HomeSwiper>
      <Recommend-view :recommend="recommend"></Recommend-view>
      <Feature-view></Feature-view>
      <Tab-control
      :titile="['流行','新款','精选']"
      ref="tabcontrol2"
      @tabClick="tabClick" />
      <Goods-list :goodslist="goodList[CurrentType].list"/>
    </Scroll>
    <!-- 监听一个组件的原生事件时，给对应的事件加上native修饰符 -->
    <BackTop @click.native="backTop" v-show="isShowBackTop" />
    <!-- <h1>首页</h1> -->

  </div>
</template>

<script>
  import Navbar from '@/components/common/navbar/NavBar'
  import TabControl from '@/components/content/tabControl/TabControl'
  import GoodsList from '@/components/content/goodsList/goodsList'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backtop/BackTop'

  import {getHomeMultiData,getHomeGoods} from 'network/home'

  /**
   * 工具函数debounce，mixin
   */
  import {debounce} from 'utils/utils'
  //import {itemListenerMixin} from 'utils/mixin'

  import HomeSwiper from './homeComps/HomeSwiper'
  import RecommendView from './homeComps/RecommendView'
  import FeatureView from './homeComps/FeatureView'

  export default {
    //mixins:[itemListenerMixin],
    data(){
      return {
        banner:null,
        recommend:null,
        goodList:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]}
        },
        //监听首tabcontrol按钮谁处于被点击状态
        CurrentType:'pop',
        //是否显示返回顶部图标标识
        isShowBackTop:false,
        //tabcontrol距离顶部的位置
        tabOffsetTop: 0,
        //tabcontrol吸顶按钮是否显示
        isTabFixed:false,
        //记录当前滚动的高度y
        saveY:0,
        //首页事件总线事件监听
        // itemImgListener:null
      }
    },
    components:{
      Navbar,
      TabControl,
      GoodsList,
			HomeSwiper,
      RecommendView,
      FeatureView,
      Scroll,
      BackTop
    },
    created(){
      //1.请求首页多个数据
      getHomeMultiData().then( res =>{
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      },
      mounted(){
        //在元素挂载完成后再进行监听，否则有可能拿不到this.$refs.scroll
        //1.监听Goodslistitem图片加载完成
        // this.$bus.$on('imgLoad',()=>{
        //   //刷新当前内容高度
        //   this.$refs.scroll.refresh()
        // })
        
        this.$bus.$on('homeImgLoad',debounce(() =>{
          this.$refs.scroll.refresh()
        },300))

      },
      //让Home保持原来的状态
      //activated()组件处于活跃时调用
      activated(){
        console.log('active')
          this.$refs.scroll.scrollTo(0,this.saveY,0)
          this.$refs.scroll.refresh()
      },
      //deactivated()组件处于不活跃状态下调用
      deactivated(){
        //1.保存当前滚动的高度
          this.saveY = this.$refs.scroll.getScrollY()

        //取消全局监听
        //this.$bus.$off('function name',function)
        // this.$bus.$off('imgLoad',this.homeGoodlistListener)
      },
    methods:{
      /**
       * @param {Object} type
       * 网络请求相关的方法
       */
      //1.请求商品数据的方法
      getHomeGoods(type){
        const page = this.goodList[type].page +1
        getHomeGoods(type,page).then(res =>{
          this.goodList[type].list.push(...res.data.list)
          this.goodList[type].page +=1

          //结束当前上拉加载，否则上拉加载无法再次触发
          this.$refs.scroll.finishPullUp();
          })
        },

        /**
         * 事件监听相关的方法
         */
        //监听内容滚动的距离
        contentScroll(position){
          //判断backTop按钮是否显示
          this.isShowBackTop = (-position.y) > 1000

          //判断tabcontrol按钮是否吸顶
          this.isTabFixed = (-position.y) > this.tabOffsetTop
        },
        //监听上拉加载
        loadMore(){
          //调用网络请求方法，请求下一页商品数据
          this.getHomeGoods(this.CurrentType)

          //刷新当前内容高度
          //this.$refs.scroll.refresh()
        },

        //轮播图片加载完成
        swiperImgLoad(){
          //.获取tabcontrol的offsettop
          //this.$refs.tabcontrol.$el 用于获取子组件的元素
          this.tabOffsetTop = this.$refs.tabcontrol2.$el.offsetTop
        },

        //返回顶部方法
        backTop(){
          this.$refs.scroll.scrollTo(0,0,500)
        },
        //监听tabcontrol点击事件
        tabClick(index){
          switch(index){
            case 0:
              this.CurrentType = 'pop';
              break;
            case 1:
              this.CurrentType = 'new';
              break;
            case 2:
              this.CurrentType = 'sell'
              break
          }
          //保证上下两个tabcontrol的点击保持一致
          this.$refs.tabcontrol1.currentIndex = index;
          this.$refs.tabcontrol2.currentIndex = index;
      }
    }
  }
</script>

<style scoped>
  .home{
    /* padding-top: 44px; */

    height: 100vh;
    position: relative;
  }
  .homeNar{
    background-color: var(--color-tint);
    color:#FFFFFF;
   /* position: fixed;
    left: 0;
    right: 0;
    top: 0; */
    z-index: 9;
  }

  .tab-control{
    position: relative;

    z-index: 9;
  }

  .content{
    overflow: hidden;

    position: absolute;
    left: 0px;
    right: 0px;
    top: 44px;
    bottom: 49px;

    /* background-color: #FFFFFF; */
  }
</style>
