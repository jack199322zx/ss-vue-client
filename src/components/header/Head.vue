<template>
  <header class="site-header headroom">
    <!--[if lt IE 9]>
    <div class="alert alert-danger alert-dismissible fade in" role="alert" style="margin-bottom:0">
      <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span><span class="sr-only">Close</span>
      </button>
      <strong>您正在使用低版本浏览器，</strong> 在本页面的显示效果可能有差异。
      建议您升级到
      <a href="http://www.google.cn/intl/zh-CN/chrome/" target="_blank">Chrome</a>
      或以下浏览器：
      <a href="www.mozilla.org/en-US/firefox/&lrm;" target="_blank">Firefox</a> /
      <a href="http://www.apple.com.cn/safari/" target="_blank">Safari</a> /
      <a href="http://www.opera.com/" target="_blank">Opera</a> /
      <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie"
         target="_blank">Internet Explorer 9+</a>
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
              <a @click="goBlogList()" nav="博客">博客</a>
            </li>
            <li>
              <a nav="小助手">小助手</a>
            </li>
            <li>
              <a nav="留言板">留言板</a>
            </li>
            <li>
              <a nav="留言板">友链</a>
            </li>
            <li>
              <a @click="goAboutMe()" nav="关于我">关于我</a>
            </li>
          </ul>
          <ul class="navbar-button list-inline" id="header_user">
            <li view="search" class="hidden-xs hidden-sm">
              <div class="navbar-form navbar-left">
                <auto-complete ref="autoComplete" @getData="getSearchList" @submitSearch="submitSearch" :searchList="searchList"></auto-complete>
              </div>
            </li>
            <li v-if="loginStatus"><a @click="goArticlePublish()" class="btn btn-sm"><i class="iconfont icon-bianji"
                                                                                        style="font-size:14px;"></i> 写文章</a>
            </li>
            <li v-if="loginStatus" class="dropdown" @mouseover="showUserInfo()" @mouseout="closeUserInfo()">
              <a href="#" class="user dropdown-toggle" data-toggle="dropdown">
                <img class="img-circle" :src="$util.imgPath(userInfo.avatar)">
                <span>{{userInfo.userCode}}</span>
              </a>
              <ul v-show="mouseHover" class="dropdown-menu" role="menu" @mouseout="closeUserInfo()">
                <li><a @click="goHomePage()"><i class="iconfont icon-zhuye"></i> 个人主页</a></li>
                <li><a @click="goDynamic()"><i class="iconfont icon-xiaoxidongtai"></i> 发现 </a>
                  <div class="menu-dynamics-div" v-if="notifyAndDynamics.dynamicNum">{{notifyAndDynamics.dynamicNum}}
                  </div>
                </li>
                <li><a @click="goMyLove()"><i class="iconfont icon-xinweixuanzhong"></i> 我喜爱的文章</a></li>
                <li><a @click="goMyFollow()"><i class="iconfont icon-dingyue"></i> 我关注的人</a></li>
                <li><a @click="goNotify()"><i class="iconfont icon-xinxi"></i> 通知 </a>
                  <div class="menu-dynamics-div" v-if="notifyAndDynamics.unreadNum">{{notifyAndDynamics.unreadNum}}
                  </div>
                </li>
                <li><a @click="logout()"><i class="iconfont icon-guanji"></i> 退出</a>
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
  import AutoComplete from '../../components/autocomplete/AutoComplete.vue';

  export default {
    props: ['model'],
    data() {
      return {
        mouseHover: false,
        userInfo: {
          userCode: '',
          id: '',
          avatar: ''
        },
        loginStatus: 0,
        notifyAndDynamics: {},
        searchList: []
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
        this.loginStatus = 0;
        this.$emit('logout');
      },
      goLogin() {
        this.$router.push('/login');
      },
      goRegister() {
        this.$router.push('/register')
      },
      goAboutMe () {
        this.$router.push('/aboutMe')
      },
      goArticlePublish() {
        location.href = location.href.replace(/(#\/).*/g, '$1article-publish');
      },
      goBlogList() {
        location.href = location.href.replace(/(#\/).*/g, '$1blog-list');
      },
      goHomePage () {
        location.href = location.href.replace(/(#\/).*/g, '$1home-page/' + this.userInfo.id + '?homeIndex=1');
      },
      goMyLove () {
        location.href = location.href.replace(/(#\/).*/g, '$1home-page/' + this.userInfo.id + '?homeIndex=3');
      },
      goMyFollow () {
        location.href = location.href.replace(/(#\/).*/g, '$1home-page/' + this.userInfo.id + '?homeIndex=4');
      },
      goNotify () {
        location.href = location.href.replace(/(#\/).*/g, '$1home-page/' + this.userInfo.id + '?homeIndex=6');
      },
      goDynamic () {
        location.href = location.href.replace(/(#\/).*/g, '$1home-page/' + this.userInfo.id + '?homeIndex=0');
      },
      getSearchList (val) {
        if (val && val.length > 0) {
          let _this = this;
          setTimeout(function () {
            _this.$http.api({
              url: '/search/find-keywords',
              params: {keywords: val.trim()},
              successCallback: function (data) {
                _this.searchList = data;
              }.bind(_this)
            })
          },300)
        }
      },
      submitSearch (val) {
        let trimVal = val.trim();
        if (trimVal && trimVal.length> 0) {
          this.$http.api({
            url: '/search/save-keywords',
            params: {keywords: trimVal},
            successCallback: function (data) {
              this.$router.push('/search?keywords=' + trimVal);
            }.bind(this)
          })
        }
      }
    },
    created() {
      this.$http.api({
        url: '/blog/check-login',
        successCallback: function (data) {
          if (data === 'failed') {
            this.loginStatus = 0;
          } else {
            this.loginStatus = 1;
            this.userInfo.userCode = data.userCode;
            this.userInfo.avatar = data.avatar;
            this.userInfo.id = data.id;
            this.notifyAndDynamics = data.notifyAndDynamics;
            this.$store.commit('SAVE_USER_INFO', {
              userCode: data.userCode,
              userId: data.id,
              userAvatar: data.avatar,
              notifyNum: data.notifyAndDynamics.unreadNum,
              dynamicNum: data.notifyAndDynamics.dynamicNum
            })
          }
        }.bind(this)
      });

    },
    mounted () {
      console.log(this.$refs.autoComplete);
      this.$refs.autoComplete.$data.inputmodel = this.model;
    },
    components: {
      AutoComplete
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

  .nav-pills > li.active > a, .nav-pills > li.active > a:focus, .nav-pills > li.active > a:hover {
    background-color: #03a9f4;
  }

  .dropdown-menu > li > a {
    line-height: 2.3;
    border-bottom: 1px solid #d8d8d8;
  }

  .dropdown-menu {
    display: block;
    margin: 0;
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

  .site-header .navbar-button > li > a.user img {
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

  .dropdown-menu {
    i {
      color: #ea6f5a;
      padding-right: 10px;
    }
    li {
      position: relative;
      a {
        font-size: 12px;
        font-weight: 500;
      }
      .menu-dynamics-div {
        position: absolute;
        top: 6px;
        right: 0;
        margin-right: 10px;
        border-radius: 10px;
        white-space: nowrap;
        text-align: center;
        color: white;
        background-color: #ea6f5a;
        font-size: 10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
      }
    }
  }
</style>
