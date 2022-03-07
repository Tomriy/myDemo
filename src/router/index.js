import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/regist',
    name: 'Regist',
    component: () => import('../views/Regist')
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/ForgetPassword')
  }
]

let router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login'){
    next();
  }else{
    let token =window.localStorage.token;
    if(token ==='null' || token ==='' || token === undefined){
      next('/login');
    }else{
      next();
    }
  }
})

export default router
