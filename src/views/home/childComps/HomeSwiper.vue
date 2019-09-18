<template>
  <!--    轮播-->
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link"><img :src="item.image" alt=""></a>
    </swiper-item>
  </swiper>
</template>

<script>
    //导入轮播
    import {Swiper, SwiperItem} from "components/common/swiper";
    export default {
        name: "HomeSwiper",
        props:{
            banners:{
                type:Array,
                //默认值写成函数
                default(){
                    return []
                }
            }
        },
        components:{
            Swiper,
            SwiperItem
        }
    }
</script>

<style scoped>

</style>
