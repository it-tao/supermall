<template>
  <!--    轮播-->
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link"><img :src="item.image" alt="" @load="imageLoad"></a>
    </swiper-item>
  </swiper>
</template>

<script>
    //导入轮播
    import {Swiper, SwiperItem} from "components/common/swiper";
    export default {
        name: "HomeSwiper",
        data(){
          return {
            isLoad:false//用它保证只发送一次加载完成事件
          }
        },
        methods:{
          //本方法会被调用4次
          imageLoad(){
            //
            if(!this.isLoad){
              this.$emit('swiperImageLoad')
              this.isLoad = true//第二张图片加载完成时，不会执行上一句代码
            }

          }
        },
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
