import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import { Dialog } from 'vant';
import { Notify } from 'vant';
import VConsole from 'vconsole'
import 'amfe-flexible/index.js'
import { Toast } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);

Vue.use(Toast);

Vue.prototype.$vconsole = VConsole;

// 全局注册
Vue.use(Notify);

// 全局注册
Vue.use(Dialog);

Vue.use(Lazyload);
Vue.use(Vant);

Vue.config.productionTip = false
// var vConsole = new VConsole();
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
