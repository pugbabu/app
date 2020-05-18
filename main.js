import Vue from 'vue'
import App from './App'
import store from "./store";
import binerStore from '@/components/biner-store/biner-store' // 本地存储

/*           注册全局自定义组件            */
import cuCustom from './colorui/components/cu-custom.vue'
import culoading from "@/components/loading/loading.vue";
import easySkeleton from '@/components/skeleton/skeleton.vue'
Vue.component('cu-custom',cuCustom)
Vue.component('cu-loading',culoading)
Vue.component('easy-skeleton',easySkeleton)

Vue.prototype.$store = store;
Vue.prototype.$storage = binerStore; // 本地存储
// 1.存储 setStorage(key,data,timer)
// this.$storage.setStorage(key,data,3000);
// 2.获取 getStorage(key)
// var data = this.$storage.getStorage(key);
// if(!data){
//     uni.showToast('数据已过期或者没有数据')
// }else{
//     console.log(data);
// }
// 3.移除 removeStorage(key)
// this.$storage.removeStorage(key);
// 4.清除 clearStorage()
// this.$storage.clearStorage();
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

 



