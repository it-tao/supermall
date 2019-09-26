import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//创建事件总线，所有组件对象都可以访问它，用它来发射和接收事件
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
