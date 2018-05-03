import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import Blog from '@/pages/blog/Blog'
import Register from '@/pages/register/Register'
import Active from '@/pages/active/Active'
import ArticleDetail from '@/pages/article/article-detail/ArticleDetail'
import ArticlePublish from '@/pages/article/article-pubblish/ArticlePubblish'
import BlogList from '@/pages/blog/blog-list/BlogList.vue'
import HomePage from '@/pages/home/home-page/HomePage.vue'
import HomeModify from '@/pages/home/home-modify/HomeModify.vue'
import AboutMe from '@/pages/aboutMe/AboutMe.vue'

import Helper from '@/pages/helper/Helper'
import MessageBoard from '@/pages/messageBoard/MessageBoard'
import PhotoAlbum from '@/pages/photoAlbum/PhotoAlbum'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/blog'
    }, {
      path: '/login',
      name: '登录',
      component: Login
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
    },{
       path: '/blog-list',
       name: '博客列表',
       component: BlogList
     }, {
      path: '/article-detail/:id(\\d+)',
      name: '博客列表',
      component: ArticleDetail
    }, {
      path: '/home-page/:id(\\d+)',
      name: '个人主页',
      component: HomePage
    }, {
      path: '/article-publish',
      name: '发布文章',
      component: ArticlePublish
    }, {
      path: '/article-publish/:id(\\d+)',
      name: '编辑文章',
      component: ArticlePublish
    }, {
      path: '/home-modify/:id(\\d+)',
      name: '修改个人主页',
      component: HomeModify
    }, {
      path: '/aboutMe',
      name: '关于我',
      component: AboutMe
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

  //
router.beforeEach((to, from, next) => {
  to.meta.customTitle = from.meta.customTitle;
  next();
});

export default router
