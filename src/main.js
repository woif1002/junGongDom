import Vue from 'vue'
import App from './index.vue';
import router from './router.js';
import '@/comm-assets/css/reset.css';
/**
 * element ui  ElementUI
 * 引入echarts  echarts
 * 引入语音播放器 
 **/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
import axios from 'axios';
import 'echarts/map/js/world.js'
import 'echarts/map/js/china.js'
import audio from 'vue-mobile-audio';
import 'echarts/extension-src/bmap/bmap.js'

Vue.prototype.$echarts = echarts;
Vue.prototype.axios = axios;
Vue.use(ElementUI).use(audio)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')