import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';
import Login from '@/components/portal/index'
import Blog from '@/pages/blog/Blog'
import Register from '@/pages/register/Register'
import Active from '@/pages/active/Active'
import Test from '@/pages/test/Test'
import ArticleDetail from '@/pages/article-detail/ArticleDetail'
import BlogList from '@/pages/blog-list/BlogList.vue'
import Helper from '@/pages/helper/Helper'
import MessageBoard from '@/pages/messageBoard/MessageBoard'
import PhotoAlbum from '@/pages/photoAlbum/PhotoAlbum'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/test'
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
    }, {
      path: '/test',
      name: '测试',
      component:Test
    }, {
       path: '/blog-list',
       name: '博客列表',
       component: BlogList
     }, {
      path: '/article-detail/:id(\\d+)',
      name: '博客列表',
      component: ArticleDetail
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
  if (to.path === '/blog-list'
    && new RegExp('/article-detail/').test(from.path)
    && to.query.conview === 'articlepublish') {
    store.commit('CHANGE_COMPONENT_STATE', {
      componentName: 'ArticlePublish'
    });
  } else if (to.path === '/blog-list' && from.path === '/test') {
    store.commit('CHANGE_COMPONENT_STATE', {
      componentName: 'BlogContent'
    });
  }
  next();
});

export default router
