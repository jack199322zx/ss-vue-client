import Vue from 'vue'
import Router from 'vue-router'
import Portal from '@/components/portal/index'
import Blog from '@/pages/blog/Blog'
import Register from '@/pages/register/register'
import Active from '@/pages/active/Active'
import AboutMe from '@/pages/aboutMe/AboutMe'
import BlogList from '@/pages/blog-list/BlogList'
import Helper from '@/pages/helper/Helper'
import MessageBoard from '@/pages/messageBoard/MessageBoard'
import PhotoAlbum from '@/pages/photoAlbum/PhotoAlbum'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: '登录',
      component: Portal
    }, {
      path: '/blog',
      name: '个人博客',
      component: Blog
    }, {
      path: '/register',
      name: '用户注册',
      component: Register
    }, {
      path: '/active',
      name: '用户激活',
      component: Active
    }
    // }, {
    //   path: '/aboutMe',
    //   name: '关于我',
    //   component: AboutMe
    // }, {
    //   path: '/blogList',
    //   name: '博客列表',
    //   component: BlogList
    // }, {
    //   path: '/helper',
    //   name: '小助手',
    //   component: Helper
    // }, {
    //   path: '/messageBoard',
    //   name: '留言板',
    //   component: MessageBoard
    // }, {
    //   path: '/photoAlbum',
    //   name: '相册',
    //   component: PhotoAlbum
    // }, {
    //   path: '/blogDetail/:id(\\d+)',
    //   name: '博客详情',
    //   component: PhotoAlbum
    // }
  ]
})
