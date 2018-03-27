import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/components/portal/index'
import Blog from '@/pages/blog/Blog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'portal',
      component: Portal
    }, {
      path: '/blog',
      name: 'blog',
      component: Blog
    }
  ]
})
