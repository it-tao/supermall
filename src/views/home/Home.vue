<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
     @tabClick="tabClick"
     ref="tabControl1"
     class="tab-control"
     v-show="isTabFixed"></tab-control>
    <scroll
     class="content"
     ref="scroll"
     :probe-type="3"
     @scroll="contentScroll"
     :pullUpLoad="true"
     @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <!--    不加：数组就会被解析成字符串-->
      <tab-control :titles="['流行','新款','精选']"
       @tabClick="tabClick"
       ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

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
  import {debounce} from "common/utils"

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
            currentType:'pop',//初始类型
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false
        }
      },
      computed:{
        showGoods(){
          return this.goods[this.currentType].list//点谁，显示谁的数据，初始为pop
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
      mounted() {
        //当你对dom有所操作时，必须在mounted里做
        //执行防抖函数，并接收返回值
        const refresh = debounce(this.$refs.scroll.refresh,500)
        //监听事件总线上的事件,
        this.$bus.$on('itemImageLoad',()=>{
          // console.log('监听到了')
          //调用接收到的返回值--一个写了定时器的匿名函数
          refresh()
        })
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
           //让两个tabControl的currentIndex同步，一个点击，另一个也发生改变
           this.$refs.tabControl1.currentIndex = index
           this.$refs.tabControl2.currentIndex = index
          },
          //回到顶部的点击事件
          backClick(){
            // console.log("回到顶部")
            this.$refs.scroll.scrollTo(0,0,500)
          },
         //子组件传来监听到的具体位置
          contentScroll(position){
            // console.log(position)
            //判断backTop是否显示
            this.isShowBackTop = (-position.y) > 1000
            //决定tabControl是否吸顶
            this.isTabFixed = (-position.y) > this.tabOffsetTop

          },
          //上拉加载更多事件
          loadMore(){
            // console.log('上拉加载更多')
            this.getHomeGoods(this.currentType)//再次请求数据
          },
          //轮播图加载完成事件
          swiperImageLoad(){
            //将获取到的值保存到本地
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
          },
          /*
          * 网络请求相关方法
          *
          * */
          //请求轮播图及推荐数据
          getHomeMultiData() {
              getHomeMultiData().then(res => {
                  this.banners = res.data.banner.list,
                      this.recommends = res.data.recommend.list
              })
          },
          //请求商品数据
          getHomeGoods(type) {
              const page = this.goods[type].page + 1
              getHomeGoods(type,page).then(res =>{

                  //把数据存到本地，并改变页数
                  this.goods[type].list.push(...res.data.list)
                  this.goods[type].page += 1

                  //请求完成后，上拉完成，使下次上拉请求数据正确执行
                  this.$refs.scroll.finishPullUp()
              })
          },
      }
  }
</script>

<style scoped>
  #home{
    height: 100vh;
    position: relative;
  }
.home-nav{
  background-color: var(--color-tint);
  color: #f6f6f6;
  /* 下面样式是在使用浏览器原生滚动时，为了让导航不跟随滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
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
  .tab-control{
    /* 相对定位，使它不会脱离自己原来的位置 */
      position: relative;
      z-index: 9;
  }
  /* .fixed{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 44px;
  } */
  /* 这是一种方案，动态计算窗口 */
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
</style>
