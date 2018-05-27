<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-col footer-col-copy">
        <ul class="footer-nav hidden-xs">
          <li class="menu-item"><a >关于我</a></li>
          <li class="menu-item"><a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=461333622&site=qq&menu=yes">
            <img border="0" src="http://wpa.qq.com/pa?p=2:461333622:52" alt="点击这里给我发消息" title="点击这里给我发消息"/>联系我</a></li>
          <li class="menu-item"><a @click="linkFriendship()">友情链接</a></li>
          <li class="menu-item"><a >常见问题</a></li>
          <li class="insert-hm">
          </li>
        </ul>
        <div class="copyright">
          <span>Copyright © Nino. </span>
          <span style="padding-left: 10px;">苏ICP备18026056号-1</span>
        </div>
      </div>
      <div class="footer-col footer-col-sns hidden-xs hidden-sm">
        <div class="footer-sns">
          <span>Powered By <a>Nino</a></span>
        </div>
      </div>
    </div>
    <div v-show="showTop" class="site-scroll-div animated fadeIn" @click="smoothToTop()">
      <a  class="site-scroll-top site-scroll-top-1" style="display: inline;text-decoration: none;">
        <i class="iconfont icon-czr_jiantoushang" style="font-size:24px;"></i>
      </a>
      <a  class="site-scroll-top site-scroll-top-2" style="display: inline;text-decoration: none;">
        <i class="iconfont icon-czr_jiantoushang" style="font-size:24px;"></i>
      </a>
      <a  class="site-scroll-top site-scroll-top-3" style="display: inline;text-decoration: none;">
        <i class="iconfont icon-czr_jiantoushang" style="font-size:24px;"></i>
      </a>
    </div>
  </footer>
</template>

<script>
  export default {
    props:['showTop'],
    methods: {
      smoothToTop () {
        $( 'html, body' ).animate({scrollTop:0}, 400);
      },
      linkMe () {
        this.$http.api({
          url: '/oath/link-me'
        });
      },
      linkFriendship () {
        this.$router.push('/linkFriendship');
      }
    }
  }
</script>
<style scoped lang="less" rel="stylesheet/less">
  .footer {
    padding: 35px 0;
    color: #5f676f;
    background: #fff;
  }
  .footer-col {
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
  }
  .footer-col-sns {
    float: right;
  }
  .site-scroll-top {
    position: fixed;
    z-index: 999;
    width: 46px;
    height: 46px;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    transition: all .3s;
    &.site-scroll-top-1 {
      bottom: 45px;
      right: 20px;
    }
    &.site-scroll-top-2 {
      bottom: 60px;
      right: 20px;
    }
    &.site-scroll-top-3 {
      bottom: 75px;
      right: 20px;
    }
  }
  .footer-nav{
    padding: 0;
    margin: 0 0 8px;
    font-size: 14px;
    list-style: none;
    li {
      display: inline-block;
      margin-right: 15px;
      line-height: 1.4;
    }
    a {
      color: #76818c;
    }
  }
  .copyright {
    font-size: 12px;
  }
</style>
