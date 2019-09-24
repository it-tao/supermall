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
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      }
    },
    mounted(){
        //创建Bscroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
          click:true,
          probeType:this.probeType,//动态设置是否要监听滚动
          pullUpLoad:this.pullUpLoad//动态设置是否要监听上拉
      })
      //监听滚动的位置
      this.scroll.on('scroll',(position) =>{
        // console.log(position)
        this.$emit('scroll',position)
      })
      //监听上拉事件，只要使用这个组件，父组件有要求监听，我就会执行
      this.scroll.on('pullingUp',()=>{
        // console.log('上拉加载更多')
        this.$emit('pullingUp')
      })
      
    }
  }
</script>

<style scoped>
</style>
