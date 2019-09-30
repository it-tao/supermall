<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <Scroll class="content">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
    </Scroll>

  </div>
</template>

<script>
  import  DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";

  import Scroll from "components/common/scroll/Scroll"

  import {getDetail,Goods,Shop} from "network/detail.js";

  export default {
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll
    },
    data(){
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{}
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
      })
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
