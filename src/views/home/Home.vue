<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <!--    不加：数组就会被解析成字符串-->
      <tab-control :titles="['流行','新款','精选']"
      class="tab-control"
       @tabClick="tabClick"></tab-control>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick"></back-top>

  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";


  import {getHomeMultiData,getHomeGoods} from "network/home";

  export default {
    name: "Home",
      data(){
        return {
           banners:[],
            recommends:[],
            goods:{
               'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop'
        }
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list
        }
      },
      components:{
          NavBar,
          TabControl,
          GoodsList,
          Scroll,
          BackTop,
          HomeSwiper,
          RecommendView,
          FeatureView

      },
      created() {
        //这里的this指向Home
          //请求轮播图，推荐栏的多个数据
        this.getHomeMultiData()
          //请求商品数据
        this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')
      },
      methods: {
        /*
        * 事件监听相关
        * */
        //这里的index是形参，子组件通过$emit触发此方法，从而实现子传父
          tabClick(index){
           switch (index){
             case 0:
               this.currentType = 'pop'
               break
               case 1:
               this.currentType = 'new'
               break
               case 2:
               this.currentType = 'sell'
               break

           }
          },
          //回到顶部的点击事件
          backClick(){
            // console.log("回到顶部")
            this.$refs.scroll.scrollTo(0,0,500)
          },
          /*
          * 网络请求相关方法
          *
          * */
          getHomeMultiData() {
              getHomeMultiData().then(res => {
                  this.banners = res.data.banner.list,
                      this.recommends = res.data.recommend.list
              })
          },
          getHomeGoods(type) {
              const page = this.goods[type].page + 1
              getHomeGoods(type,page).then(res =>{

                  //把数据存到本地，并改变页数
                  this.goods[type].list.push(...res.data.list)
                  this.goods[type].page += 1
              })
          },
      }
  }
</script>

<style scoped>
  #home{
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
  .tab-control{
    position: sticky;
    top: 44px;
    background-color: #eeeeee;
    z-index: 9;
  }
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* background-color: #fff; */
  }
  /* 这是一种方案，动态计算窗口 */
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
