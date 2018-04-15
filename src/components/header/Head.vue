<template>
  <header class="site-header headroom">
    <!--[if lt IE 9]>
    <div class="alert alert-danger alert-dismissible fade in" role="alert" style="margin-bottom:0">
      <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button>
      <strong>您正在使用低版本浏览器，</strong> 在本页面的显示效果可能有差异。
      建议您升级到
      <a href="http://www.google.cn/intl/zh-CN/chrome/" target="_blank">Chrome</a>
      或以下浏览器：
      <a href="www.mozilla.org/en-US/firefox/&lrm;" target="_blank">Firefox</a> /
      <a href="http://www.apple.com.cn/safari/" target="_blank">Safari</a> /
      <a href="http://www.opera.com/" target="_blank">Opera</a> /
      <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">Internet Explorer 9+</a>
    </div>
    <![endif]-->

    <div class="container">
      <nav class="navbar" role="navigation">
        <div class="navbar-header">
          <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="/">
            <img src="../../assets/images/blog-logo.jpg">
          </a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <a href="/channel/1" nav="博客">博客</a>
            </li>
            <li>
              <a href="/channel/2" nav="分享">分享</a>
            </li>
            <li>
              <a href="/channel/3" nav="问答">问答</a>
            </li>
            <li>
              <a href="/channel/4" nav="招聘">招聘</a>
            </li>
          </ul>
          <ul class="navbar-button list-inline" id="header_user">
            <li view="search" class="hidden-xs hidden-sm">
              <form method="GET" action="/search" accept-charset="UTF-8" class="navbar-form navbar-left">
                <div class="form-group search-div">
                  <input class="form-control search-input mac-style" placeholder="搜索" name="kw" type="text" value="">
                  <button class="search-btn" type="submit"><i class="iconfont icon-kandianbo-sousuo" style="font-size:14px"></i></button>
                </div>
              </form>
            </li>
            <li v-if="loginStatus"><a href="/post/new" class="btn btn-sm"><i class="iconfont icon-bianji" style="font-size:14px;"></i> 写文章</a></li>
            <li v-if="loginStatus" class="dropdown"  @mouseover="showUserInfo()">
              <a href="#" class="user dropdown-toggle" data-toggle="dropdown" @mouseout="closeUserInfo()">
                <img class="img-circle" src="../../assets/images/user-touxiang.jpg">
                <span>{{user.userName}}</span>
              </a>
              <ul v-show="mouseHover"  class="dropdown-menu" role="menu"><li><a href="/user/1280"><i class="icon icon-home"></i> 个人主页</a></li><li><a @click="logout()"><i class="icon icon-logout"></i> 退出</a>
              </li>
              </ul>
            </li>

            <li v-if="!loginStatus"><a @click="goLogin()" class="btn btn-default btn-sm signup">登录</a></li>

            <li v-if="!loginStatus"><a @click="goRegister()" class="btn btn-primary btn-sm signup">注册</a></li>

          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<script>
import '../../assets/styles/bootstrap/css/bootstrap.min.css';
  export default {
    props: {
      loginStatus: {
        type: Number,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        mouseHover: false
      }
    },
    methods: {
      showUserInfo() {
        this.mouseHover = true
      },
      closeUserInfo() {
        this.mouseHover = false
      },
      logout() {
        this.$emit('logout');
      },
      goLogin () {
        this.$router.push('/login');
      },
      goRegister() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  a {
    color: #333;
    text-decoration: none;
  }

  a:hover, a:focus, a:active {
    color: #03a9f4;
    text-decoration: none;
  }
  /* Override bootstrap
-------------------------------------------------- */
  .btn-primary {
    color: #fff;
    background-color: #03a9f4;
    border-color: #03a9f4;
  }

  .btn-primary:hover, .btn-primary.active, .btn-primary:focus {
    color: #fff;
    background-color: #17b2f9;
    border-color: #17b2f9;
  }

  .btn-default {
    border-color: #ebebeb;
  }

  .btn-default:hover, .btn-default.active, .btn-default:focus {
    background-color: #fff;
  }

  .btn-inverted {
    color: #03a9f4;
    background-color: transparent;
    border: 1px solid #03a9f4;
  }

  .btn-success {
    color: #fff;
    background-color: #62c162;
    border-color: #62c162;
  }

  .btn-success:hover, .btn-success.active, .btn-success:focus {
    color: #fff;
    background-color: #5cb85c;
    border-color: #5cb85c;
  }

  .pagination {
    margin: 15px 0;
  }

  .pagination > .active > a, .pagination > .active > a:focus, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:focus, .pagination > .active > span:hover {
    background-color: #6fbef7;
    border-color: #6fbef7;
  }

  .pagination > li > a, .pagination > li > span {
    color: #999;
    background-color: #fafafa;
    border-color: #e6e6e6;
  }

  .pagination > li:first-child > a, .pagination > li:first-child > span {
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }

  .pagination > li:last-child > a, .pagination > li:last-child > span {
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .panel {
    border-radius: 2px;
    border-color: #f0f0f0;
  }

  .panel .panel-heading {
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
  }

  .panel .panel-footer {
    border-top: none;
    background-color: #fcfcfc;
  }

  .nav-pills>li.active>a, .nav-pills>li.active>a:focus, .nav-pills>li.active>a:hover {
    background-color: #03a9f4;
  }
  .dropdown-menu > li > a {
    line-height: 2.3;
    border-bottom: 1px solid #d8d8d8;
  }
  .dropdown-menu {
    display:block;
    padding: 0;
  }
  /* HEAD
  -------------------------------------------------- */
  .site-header {
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    min-height: 50px;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
    opacity: .97;
  }

  .site-header .navbar-brand {
    padding: 9px 0;
  }

  .site-header .navbar-brand img {
    max-height: 32px;
  }

  .site-header .navbar {
    border: 0;
    margin-bottom: 0;
  }

  .site-header .navbar-nav {
    margin-left: 25px;
  }

  .site-header .navbar-nav > li > a {
    color: #383838;
    font-size: 14px;
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .site-header .navbar-nav > li > a:focus, .site-header .navbar-nav > li > a:hover {
    color: #03a9f4;
    background-color: transparent;
  }

  .site-header .navbar-nav > li.active > a {
    color: #03a9f4;
  }

  .site-header .navbar-button {
    margin: 0;
    text-align: right;
  }

  .site-header .navbar-button > li {
    margin: 0;
    padding: 0;
    vertical-align: top;
  }

  .site-header .navbar-button > li a.btn {
    margin: 10px 0 10px 10px;
  }

  .site-header .navbar-button > li > a.login, .site-header .navbar-button > li > a.signup {
    min-width: 70px;
  }

  .site-header .navbar-button > li > a.user {
    padding: 10px 10px;
    line-height: 30px;
    position: relative;
    display: block;
  }

  .site-header .navbar-button > li > a.user img{
    width: 30px;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 50%;
    margin-right: 5px;
  }

  .site-header .navbar .navbar-toggle {
    margin-right: 0;
    padding-right: 0;
    margin-top: 12px;
  }

  .site-header .navbar .navbar-toggle .icon-bar {
    background-color: #6e6e6e;
  }

  .site-header .navbar-form {
    position: relative;
    padding: 0px 20px;
  }

  .site-header .navbar-form .form-control {
    padding-left: 30px;
    font-size: 14px;
    line-height: 1em;
    background-color: #fff;
    border: none;
    border-radius: 0;
    color: inherit;
  }

  .site-header .navbar-form .mac-style {
    width: 180px;
    transition: width 1s ease-in-out;
  }

  .site-header .navbar-form .search-input {
    border-radius: 3px;
    box-shadow: none;
    transition: all 0.15s ease-in 0s;
  }

  .site-header .navbar-form .search-btn {
    position: absolute;
    left: 28px;
    top: 6px;
    font-size: 14px;
    color: #ccc;
    background-color: transparent;
    border: none;
    outline: none;
  }

  .site-header .navbar-form .search-btn:hover {
    color: #969696;
  }

  .site-header .navbar-form .mac-style:focus {
    width: 200px;
    background-color: #fafafa;
  }

  .headroom {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    -webkit-transition: .5s;
    -o-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    transition: transform 0.5s ease-in-out;
    -webkit-transform: translateY(0px);
    -o-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    transform: translateY(0px);
  }

  .headroom--unpinned {
    top: -65px;
    -webkit-transition: .5s;
    -o-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    transition: .5s;
    -webkit-transform: translateY(-65px);
    -o-transform: translateY(-65px);
    -moz-transform: translateY(-65px);
    -ms-transform: translateY(-65px);
    transform: translateY(-65px);
  }

  .headroom--pinned {
    top: 0;
    -webkit-transition: .5s;
    -o-transition: .5s;
    -moz-transition: .5s;
    -ms-transition: .5s;
    transition: .5s;
  }
  /* 滚动条
  -------------------------------------------------- */
  /*滚动条宽度*/
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* 轨道样式 */
  ::-webkit-scrollbar-track {

  }

  /* Handle样式 */
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  /*当前窗口未激活的情况下*/
  ::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.1);
  }

  /*hover到滚动条上*/
  ::-webkit-scrollbar-thumb:vertical:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  /*滚动条按下*/
  ::-webkit-scrollbar-thumb:vertical:active {
    background-color: rgba(0, 0, 0, 0.7);
  }

  .img-circle {
    display: inline-block;
  }

</style>
