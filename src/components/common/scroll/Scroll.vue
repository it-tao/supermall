<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
    <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  export default {
    name:"Scroll",
    data(){
      return {
        scroll:null
      }
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      }
    },
    mounted(){

      this.scroll = new BScroll(this.$refs.wrapper,{

      })
      // this.scroll.scrollTo(0,0)
    }
  }
</script>

<style scoped>
</style>
