import {debounce} from "./utils"
export const itemListenerMixin = {
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,500)
    //监听GoodsListItem的图片加载完成事件
    this.itemImgListener = ()=>{
      // console.log('监听到了')
      //调用接收到的返回值--一个写了定时器的匿名函数
      refresh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
    console.log('混入成功')
  }
}
