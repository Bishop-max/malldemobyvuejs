<template>
  <div id="detail">
    <DetailNavBar class="detail-nav" @titleClick="titleClick" ref="detailnav"/>
    <Scroll class="content" ref="detailScroll" :probe-type="3" @scroll="contentScroll">
      <!-- <ul>
      	<li v-for="item in this.$store.state.cartList" >{{item}}</li>
      </ul> -->
      <DetailSwiper :topImg="topImg"/>
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <DetailParamInfo ref="param" :param-info="paramInfo"/>
      <DetailCommentInfo ref="comment" :comment-info="commentInfo"/>
      <Goods-list ref="recommend" :goodslist="recommends" />
    </Scroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop" />
    <DetailBottomBar @addToCart="addToCart"/>
    <!-- <Toast :message="message" :is-show="isShow"></Toast> -->
  </div>
</template>

<script>
  /**
   * 子组件
   */
  //详情页导航栏
  import DetailNavBar from './detailComps/DetailNavBar'
  //详情页轮播图
  import DetailSwiper from './detailComps/DetailSwiper'
  //详情页商品基本信息
  import DetailBaseInfo from './detailComps/DetailBaseInfo'
  //详情页商品店铺信息
  import DetailShopInfo from './detailComps/DetailShopInfo'
  //详情页商品穿着效果信息
  import DetailGoodsInfo from './detailComps/DetailGoodsInfo'
  //详情页面商品参数信息
  import DetailParamInfo from './detailComps/DetailParamInfo'
  //详情页面商品评论信息
  import DetailCommentInfo from './detailComps/DetailCommentInfo'
  //
  import DetailBottomBar from './detailComps/DetailBottomBar'

  //goodslist
  import GoodsList from 'components/content/goodsList/goodsList'
  //toast点击加入购物车后弹窗
  // import Toast from 'components/common/toast/Toast'
  /**
   * 网络请求
   */
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'

  /**
   * better-scroll
   */
  import Scroll from 'common/scroll/Scroll'

  /**
   * 工具函数debounce,mixins
   */
  import {debounce} from 'utils/utils'
  //使用混入减少backtop重复代码
  import {backTopMixin} from 'utils/mixin'

  /**
   * 导入vuex中Actions的辅助函数
   */
  import {mapActions} from 'vuex'

  export default{
    name:'Detail',
    //mixins:[itemListenerMixin],
      mixins:[backTopMixin],
    data(){
      return {
        //保存详情页面的id
        iid:null,
        //保存轮播图数据
        topImg:[],
        //商品信息整合
        goods:{},
        //店铺信息整合
        shop:{},
        //详情页商品穿着效果信息
        detailInfo:{},
        //详情页面商品参数信息
        paramInfo:{},
        //商品评论信息
        commentInfo:{},
        //推荐信息
        recommends:[],
        //详情页事件总线监听
        // itemImgListener:null,
        //对应模块的offsettop
        themeTopY:[],
        //
        currentIndex:0,
        //isShow判断toast是否显示
        // isShow:true,
        // //message:toast要显示的内容
        // message:''
      }
    },
    methods:{
      //Actions的辅助函数的使用
      ...mapActions(['addCart']),
      //监听DetailGoodsInfo中图片加载，完成后对scroll进行一次refresh
      imgLoad(){
        this.$refs.detailScroll.refresh()

        //DetailGoodsInfo中图片加载，完成后对scroll进行一次refresh之后，保存各个模块的offetTop并保存
        /**
         * create中获取不行，因为获取不到元素
         * mounted也不行，数据还没到
         * 获取到数据的回调中也不行，Dom还没渲染完
         * $nextTick()不行，因为图片的高度没有计算在内  ==》对应的DOM已经渲染出来，但是图片依旧没有加载完
         * 在图片加载完成后，获取的高度才是正确的
         */
        this.themeTopY = []
        this.themeTopY.push(0)
        this.themeTopY.push(this.$refs.param.$el.offsetTop)
        this.themeTopY.push(this.$refs.comment.$el.offsetTop)
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopY.push(Number.MAX_VALUE)

      },
      //监听detail-navbar的点击,并跳转到相应的位置
      titleClick(index){
        this.$refs.detailScroll.scrollTo(0,-this.themeTopY[index],200)
      },
      //
      contentScroll(position){

        //获取y值
        const positionY = -position.y;
        //高度是否达到展示返回顶部按钮
        this.isShowBackTop = positionY > 1000

        for(let i = 0 ; i < this.themeTopY.length-1 ; i++){
          if(this.currentIndex !== i && (positionY >= this.themeTopY[i]) && (positionY < this.themeTopY[i+1])){
            this.currentIndex = i;
            //将正确的index传给detailnavbar
            this.$refs.detailnav.currentIndex = this.currentIndex;
          }
        }
      },
      //返回顶部
      backTop(){
        this.$refs.detailScroll.scrollTo(0,0,500)
      },
      //将商品添加到购物车
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImg[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        //2.将商品添加到购物车里
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res)
        // })
        this.addCart(product).then(res => {
          // this.isShow = true
          // this.message = res

          // setTimeout(() =>{
          //   this.isShow = false
          //   this.message = ''
          // // },2000)
          // console.log(res)
          this.$toast.show(res,2000)
          console.log(this.$toast)
        })
      }
    },
    created(){
      this.iid = this.$route.params.iid;

      //发送详情页网络请求
      getDetail(this.iid).then(res => {
        //将轮播图数据保存起来
        this.topImg = res.result.itemInfo.topImages;
        let data = res.result;
        //将整合好的商品信息数据保存起来
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        //将整合好的店铺信息数据保存起来
        this.shop = new Shop(data.shopInfo);
        //详情页商品穿着效果信息保存
        this.detailInfo = data.detailInfo;
        //详情页商品参数信息保存
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule);
        //详情页面商品评论信息保存
        if(data.rate.cRate !== 0){
          //取出一条评论
          this.commentInfo = data.rate.list[0]
        }
      })
      //请求推荐相关的数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted(){
      // this.itemImgListener = () =>{
      //   debounce(() =>{
      //     this.$refs.detailScroll.refresh()
      //   },500)
      //   }
      // this.$bus.$on('imgLoad',this.itemImgListener)
      this.$bus.$on('detailImgLoad',debounce(() =>{
        // console.log(this.$refs.detailScroll.refresh)
        this.$refs.detailScroll.refresh()
      },500))
    },
    destroyed(){
      //取消全局监听
      //this.$bus.$off('function name',function)
      // this.$bus.$off('imgLoad',this.itemImgListener)
    },
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      // Toast
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    height: 100vh;
    background-color: #FFFFFF;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #FFFFFF;

  }
  .content{
    height: calc(100% - 93px );

  }
</style>
