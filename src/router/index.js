import Vue from 'vue'
import Router from 'vue-router'
import natConfig from '@/pages/natConfig'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'nat-config',
      component: natConfig
    },
    {
      path: '/nat-config',
      name: 'nat-config',
      component: natConfig
    },
  ]
})
