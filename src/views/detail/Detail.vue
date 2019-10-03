<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <Scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommends"/>
    </Scroll>

  </div>
</template>

<script>
  import  DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo"

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js";
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin"

  export default {
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList
    },
    mixins:[itemListenerMixin],
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImgListener:null
      }
    },
    methods:{
      imageLoad(){
        this.$refs.scroll.refresh()
      }
    },
    created() {
      //获取当前活跃路由得params信息
      this.iid = this.$route.params.iid

      //调用方法，根据iid发送网络请求
      getDetail(this.iid).then(res => {
        // console.log(res)
        const data = res.result
        //请求到的商品图片数据保存到本地
        this.topImages = data.itemInfo.topImages
        //把请求到的商品主要信息整合到一个对象里，便于传给子组件
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        //创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)
        //保存商品详细信息（图片、描述）
        this.detailInfo = data.detailInfo
        //保存商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        //取出评论信息
        //先判断有没有评论
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
        //保存商品推荐信息
        getRecommend().then(res =>{
          console.log(res)
          this.recommends = res.data.list
        })
      })
    },
    mounted(){
      //调用防抖
    },
    destroyed() {
      console.log('de')
      //离开时取消事件监听
      this.$bus.$off('itemImageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 父元素要100%窗口高度，scroll,才能起作用 ,否则scroll高度和内容高度一样,就无法滚动*/
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content{
    height: calc(100% - 44px);
  }
</style>
