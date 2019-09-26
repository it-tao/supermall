<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  //使用时必须设置高度
  export default {
    name:"Scroll",
    data(){
      return {
        scroll:null
      }
    },
    props:{
      probeType:{
        type:Number,
        default(){
          return 0
        }
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      //滚动
      scrollTo(x,y,time=300){
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      //数据请求后，完成上拉加载
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp()
      },
      //刷新可滚动高度
      refresh(){
        // console.log('防抖动')
        //确保better-scroll已经初始化完成，再去调它的方法
        this.scroll && this.scroll.refresh()
      }
    },
    mounted(){
        //创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,//动态设置是否要监听滚动
          pullUpLoad:this.pullUpLoad//动态设置是否要监听上拉
      })
      //用if先判断是否要监听，性能会高一点

      if (this.probeType === 2 || this.probeType === 3){
        //监听滚动的位置
        this.scroll.on('scroll',(position) =>{
          // console.log(position)
          this.$emit('scroll',position)
        })
      }

      if (this.pullUpLoad){
        //监听上拉事件，只要使用这个组件，父组件有要求监听，我就会执行
        this.scroll.on('pullingUp',()=>{
          // console.log('上拉加载更多')
          this.$emit('pullingUp')
        })
      }



    }
  }
</script>

<style scoped>
</style>
