// import Blog from '@/pages/blog/Blog'
// import Register from '@/pages/register/Register'
// import Active from '@/pages/active/Active'
// import ArticleDetail from '@/pages/article/article-detail/ArticleDetail'
// import ArticlePublish from '@/pages/article/article-pubblish/ArticlePubblish'
// import BlogList from '@/pages/blog/blog-list/BlogList.vue'
// import HomePage from '@/pages/home/home-page/HomePage.vue'
// import HomeModify from '@/pages/home/home-modify/HomeModify.vue'
// import AboutMe from '@/pages/aboutMe/AboutMe.vue'
// import SearchArticle from '@/pages/search/SearchArticle.vue'
// import WebsiteHistory from '@/pages/websiteHistory/WebsiteHistory.vue'
// import MessageBoard from '@/pages/messageBoard/MessageBoard.vue'
// import Friendship from '@/pages/friendship/Friendship.vue'
const Login = resolve => require(['@/pages/login'], resolve)
const Blog = resolve => require(['@/pages/blog/Blog'], resolve)
const Register = resolve => require(['@/pages/register/Register'], resolve)
const Active = resolve => require(['@/pages/active/Active'], resolve)
const ArticleDetail = resolve => require(['@/pages/article/article-detail/ArticleDetail'], resolve)
const ArticlePublish = resolve => require(['@/pages/article/article-pubblish/ArticlePubblish'], resolve)
const BlogList = resolve => require(['@/pages/blog/blog-list/BlogList.vue'], resolve)
const HomePage = resolve => require(['@/pages/home/home-page/HomePage.vue'], resolve)
const HomeModify = resolve => require(['@/pages/home/home-modify/HomeModify.vue'], resolve)
const AboutMe = resolve => require(['@/pages/aboutMe/AboutMe.vue'], resolve)
const SearchArticle = resolve => require(['@/pages/search/SearchArticle.vue'], resolve)
const WebsiteHistory = resolve => require(['@/pages/websiteHistory/WebsiteHistory.vue'], resolve)
const MessageBoard = resolve => require(['@/pages/messageBoard/MessageBoard.vue'], resolve)
const Friendship = resolve => require(['@/pages/friendship/Friendship.vue'], resolve)

// Vue.use(VueRouter)
const router = new VueRouter({
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
    }, {
      path: '/search',
      name: '搜索',
      component: SearchArticle
    }, {
      path: '/messageBoard',
      name: '留言板',
      component: MessageBoard
    }, {
      path: '/linkFriendship',
      name: '友链',
      component: Friendship
    }, {
      path: '/websiteHistory',
      name: '建站笔录',
      component: WebsiteHistory
    }
  ]
})

  //
router.beforeEach((to, from, next) => {
  to.meta.customTitle = from.meta.customTitle;
  next();
});

export default router
