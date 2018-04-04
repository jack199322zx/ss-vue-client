<template>
  <article>
    <div class="l_box f_l">
      <div class="banner">
        <swipe :auto="6000">
          <swipe-item v-for="item in swipeList">
            <img id="slide-img-1" :src="item.path" alt="" style="width:100%"/>
          </swipe-item>
        </swipe>
      </div>
      <!-- banner代码 结束 -->
      <div class="topnews">
        <h2>
          <span>
            <a  @click="chooseTitle(index)" v-for="(title,index) in titleList">{{title}}</a>
          </span><b>文章</b>推荐
        </h2>
        <div class="blogs" v-for="(blog, index) in filterBlogs">
          <figure><img :src="blog.blogImg"></figure>
          <ul>
            <h3><a>{{blog.title}}</a></h3>
            <p>{{blog.blogDesc}}</p>
            <p class="autor"><span class="lm f_l"><a href="/">{{blog.blogType}}</a></span><span
              class="dtime f_l">{{blog.time}}</span><span
              class="viewnum f_r">浏览（<a>{{blog.viewNum}}</a>）</span><span class="pingl f_r">评论（<a>{{blog.comments}}</a>）</span>
            </p>
          </ul>
        </div>
      </div>
      <div v-if="this.filterBlogs.length === 6">查看更多 …</div>
    </div>
    <div class="r_box f_r">
      <div class="tit01">
        <h3>友情链接</h3>
        <div class="gzwm">
          <ul>
            <li><a class="xlwb" href="https://weibo.com/" target="_blank">新浪微博</a></li>
            <li><a class="txwb" href="http://t.qq.com" target="_blank">腾讯微博</a></li>
            <li><a class="rss" href="https://github.com/" target="_blank">gitHub</a></li>
            <li><a class="wx" href="http://mail.qq.com">邮箱</a></li>
          </ul>
        </div>
      </div>
      <!--tit01 end-->
      <div class="ad300x100"><img :src="images.ad300x100"></div>
      <div class="moreSelect" id="lp_right_select">
        <div class="ms-top">
          <ul class="hd" id="tab">
            <li class="cur"><a href="/">点击排行</a></li>
            <li><a href="/">最新文章</a></li>
            <li><a href="/">站长推荐</a></li>
          </ul>
        </div>
        <div class="ms-main" id="ms-main">
          <div style="display: block;" class="bd bd-news">
            <ul>
              <li v-for="(rank,index) in clickRankList"><a>{{rank.title}}</a></li>
            </ul>
          </div>
          <div class="bd bd-news">
            <ul>
              <li v-for="(news,index) in newsList"><a>{{news.title}}</a></li>
            </ul>
          </div>
          <div class="bd bd-news">
            <ul>
              <li v-for="(comm,index) in recommend"><a>{{comm.title}}</a></li>
            </ul>
          </div>
        </div>
        <!--ms-main end -->
      </div>
      <!--切换卡 moreSelect end -->

      <div class="cloud">
        <h3>标签云</h3>
        <ul>
          <li><a href="/">Html5</a></li>
          <li><a href="/">CSS3</a></li>
          <li><a href="/">Vue</a></li>
          <li><a href="/">Vuex</a></li>
          <li><a href="/">VueRouter</a></li>
          <li><a href="/">Spring</a></li>
          <li><a href="/">SpringBoot</a></li>
          <li><a href="/">SpringCloud</a></li>
          <li><a href="/">SpringMvc</a></li>
          <li><a href="/">Javasript</a></li>
          <li><a href="/">Nginx</a></li>
          <li><a href="/">Redis</a></li>
          <li><a href="/">ElasticSearch</a></li>
          <li><a href="/">ActiveMQ</a></li>
          <li><a href="/">Zookeeper</a></li>
          <li><a href="/">Dubbo</a></li>
          <li><a href="/">Shiro</a></li>
          <li><a href="/">Druid</a></li>
          <li><a href="/">Velocity</a></li>
          <li><a href="/">Thymeleaf</a></li>
          <li><a href="/">Freemarker</a></li>
          <li><a href="/">Quartz</a></li>
          <li><a href="/">Ehcache</a></li>
          <li><a href="/">FastDFS</a></li>
          <li><a href="/">MyBatis</a></li>
          <li><a href="/">Zookeeper</a></li>
          <li><a href="/">Tomcat</a></li>
        </ul>
      </div>
      <div class="tuwen">
        <h3>图文推荐</h3>
        <ul>
          <li><a href="/"><img :src="images.b1"><b>住在手机里的朋友</b></a>
            <p><span class="tulanmu"><a href="/">手机配件</a></span><span class="tutime">2015-02-15</span></p>
          </li>
          <li><a href="/"><img :src="images.b2"><b>教你怎样用欠费手机拨打电话</b></a>
            <p><span class="tulanmu"><a href="/">手机配件</a></span><span class="tutime">2015-02-15</span></p>
          </li>
          <li><a href="/" title="手机的16个惊人小秘密，据说99.999%的人都不知"><img :src="images.b3"><b>手机的16个惊人小秘密，据说...</b></a>
            <p><span class="tulanmu"><a href="/">手机配件</a></span><span class="tutime">2015-02-15</span></p>
          </li>
          <li><a href="/"><img :src="images.b3"><b>住在手机里的朋友</b></a>
            <p><span class="tulanmu"><a href="/">手机配件</a></span><span class="tutime">2015-02-15</span></p>
          </li>
          <li><a href="/"><img :src="images.b4"><b>教你怎样用欠费手机拨打电话</b></a>
            <p><span class="tulanmu"><a href="/">手机配件</a></span><span class="tutime">2015-02-15</span></p>
          </li>
        </ul>
      </div>
      <div class="ad"><img :src="images.b3"></div>
      <div class="links">
        <h3><span>[<a href="/">申请友情链接</a>]</span>友情链接</h3>
        <ul>
          <li><a href="/">杨青个人博客</a></li>
          <li><a href="/">web开发</a></li>
          <li><a href="/">前端设计</a></li>
          <li><a href="/">Html</a></li>
          <li><a href="/">CSS3</a></li>
          <li><a href="/">Html5+css3</a></li>
          <li><a href="/">百度</a></li>
        </ul>
      </div>
    </div>
    <!--r_box end -->
  </article>
</template>

<script>
  import Swipe from '../../components/swipe/swipe.vue';
  import SwipeItem from '../../components/swipe/swipe-item.vue';

  export default {
    props: ['swipeList','images','titleList','blogs','clickRankList','newsList','recommend'],
    data () {
      return {
        filterBlogs: []
      }
    },
    methods: {
      chooseTitle (index) {
        this.filterBlogs =  this.blogs.filter(blog => this.titleList[index] === blog.blogType);
      }
    },
    mounted() {
      var oLi = document.getElementById("tab").getElementsByTagName("li");
      var oUl = document.getElementById("ms-main").getElementsByTagName("div");
      for (var i = 0; i < oLi.length; i++) {
        oLi[i].index = i;
        oLi[i].onmouseover = function () {
          for (var n = 0; n < oLi.length; n++) oLi[n].className = "";
          this.className = "cur";
          for (var n = 0; n < oUl.length; n++) oUl[n].style.display = "none";
          oUl[this.index].style.display = "block"
        }
      }
    },
    created () {
      this.filterBlogs = this.blogs;
    },
    components: {
      Swipe,
      SwipeItem,
    }
  }
</script>
