<template>
  <div class="about-me-body">
    <Head @logout="logout"></Head>
    <div class="about-me-content" ref="aboutMe">
      <div class="selection">
        <div class="about-content clearfix section-content" style="padding-top: 70px;">
          <div class="introli animated fadeInRight">
            <div class="left_icon"><img class="bio-text bio-icon-1" src="./bio-icon-1.png" style="width:100%;"></div>
            <div class="right_content">站长是一名小小的编程爱好者</div>
          </div>
          <div class="introli animated fadeInRight introli-2">
            <div class="left_icon"><img class="bio-text bio-icon-2" src="./bio-icon-2.png" style="width:100%;"></div>
            <div class="right_content">建站初衷是为了记录生活的点点滴滴</div>
          </div>
          <div class="introli animated fadeInRight introli-3">
            <div class="left_icon"><img class="bio-text bio-icon-3" src="./bio-icon-3.png" style="width:100%;"></div>
            <div class="right_content">致力于分享软件、文章、html5、java技术等一切好玩的东东！</div>
          </div>
        </div>
      </div>
      <a class="button2 dark-button2 scroll-tip" style="background-position:0 -60px;" data-slide="3" title=""></a>
    </div>
    <div class="hight-body-1">
      <p class="about-blog-author">关于博主</p>
      <pre>
        <code class="hljs json">
    {
        <span class="hljs-attr">"nickname"</span>: <span class="hljs-string">"尼诺"</span>,
        <span class="hljs-attr">"contact"</span>: {
        <span class="hljs-attr">&nbsp;&nbsp;&nbsp;"email"</span>: <span class="hljs-string">"461333622@qq.com"</span>,
        <span class="hljs-attr">&nbsp;&nbsp;&nbsp;"weibo"</span>: <span class="hljs-string">"@尼诺"</span>,
        },
        <span class="hljs-attr">"location"</span>: <span class="hljs-string">"Nan'jing"</span>,
        <span class="hljs-attr">"skills"</span>: [<span class="hljs-string">"HTML"</span>, <span
          class="hljs-string">"CSS"</span>, <span class="hljs-string">"JavaScript"</span>, <span class="hljs-string">"Vue"</span>, <span
          class="hljs-string">"Java"</span>, <span class="hljs-string">"MySQL"</span>],
        <span class="hljs-attr">"tags"</span>: [<span class="hljs-string">"水瓶男"</span>, <span
          class="hljs-string">"死亡笔记"</span>, <span class="hljs-string">"杰伦迷"</span>, <span
          class="hljs-string">"随风而行"</span>]
    }
        </code>
      </pre>
      <p class="about-blog-author">关于版权</p>
      <blockquote class="block-quote">
        <p>本博客部分为原创文章，部分为转载文章，若转载文章侵犯到您的版权，请联系我删除…</p>
      </blockquote>
      <p class="about-blog-author">友情提示</p>
      <blockquote class="block-quote">
        <p>请尽量在谷歌浏览器下访问本网站，更多咨询请联系QQ：<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=461333622&site=qq&menu=yes">
          <img border="0" src="http://wpa.qq.com/pa?p=2:461333622:52" alt="点击这里给我发消息" title="点击这里给我发消息"/>461333622</a>。</p>
      </blockquote>
      <p class="about-blog-author">联系站长</p>
      <p class="about-blog-author">
        <img src="../../../src/assets/images/lianxiwexin.jpg" class="link-author">
      </p>
    </div>
    <Footer :showTop="showTop"></Footer>
  </div>
</template>

<script>
  import Head from '../../components/header/Head.vue';
  import auth from '../../auth/index';
  import Footer from '../../components/foot/Footer.vue';
  export default{
    data () {
      return {
        showTop: false
      }
    },
    mounted () {
      this.$refs.aboutMe.style.height = window.innerHeight + 'px';
    },
    methods: {
      logout () {
        auth.logout();
      }
    },
    components: {
      Head,
      Footer
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .about-me-body {
    background: #eee url(./bg-tile.png) 0 0;
  }

  .about-me-content {
    position: relative;
    z-index: 2;
  }

  .introli {
    width: 70%;
    margin: 20px 15%;
    display: flex;
    align-items: center;
    &.introli-2 {
      animation-delay: .5s;
    }
    &.introli-3 {
      animation-delay: 1s;
    }
    .left_icon {
      width: 13%;
    }
  }

  .button2 {
    display: block;
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 70px;
    left: 50%;
    margin-left: -30px;
    border-radius: 50%;
    top: auto !important;
    text-indent: -9999px;
    opacity: 0.75;
    background: url(./arrow.png);
    -webkit-transition: all .2s ease-in 0s;
    z-index: 9999;
    -webkit-transform: scale(0.8);
  }

  .right_content {
    font-size: 24px;
    padding-left: 10%;
    width: 87%;
  }

  .hight-body-1 {
    margin: 0 auto;
    width: 60%;
    .block-quote {
      margin-left: 0;
      margin-right: 0;
      padding: 0 15px;
      color: #777;
      border-left: 4px solid #ddd;
      font-size: 16px;
    }
    .about-blog-author {
      font-size: 20px;
      font-weight: bolder;
      color: #000;
      padding-bottom: 10px;
      &:nth-child(3) {
        padding-top: 20px;
      }
      .link-author {
        width: 60%;
        margin: 0 auto;
        display: block;
      }
    }
    pre {
      word-wrap: normal;
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      background: #1d1f21;
      code {
        max-width: initial;
        margin: 0;
        line-height: inherit;
        word-wrap: normal;
        white-space: pre;
        border: 0;
        -webkit-border-radius: 3px;
        border-radius: 3px;
        font: normal 10pt Consolas, Monaco, monospace;
        font-size: 16px;
      }
    }
  }
</style>
