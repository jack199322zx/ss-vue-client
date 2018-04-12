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
          <span style="display: flex">
            <a class="choose-title" @click="chooseTitle(index)" v-for="(title,index) in titleList">{{title}}</a>
          </span><b>文章</b>推荐
        </h2>
        <div class="blogs" v-for="(blog, index) in filterBlogs" v-if="index < 6">
          <figure><img v-lazy="images.a1"></figure>
          <ul>
            <h3><a>{{blog.articleTitle}}</a></h3>
            <p class="article-desc">{{blog.articleDesc}}</p>
            <p class="autor"><span class="lm f_l"><a href="/">{{blog.articleType|typeFilter}}</a></span><span
              class="dtime f_l">{{blog.createTime|timeFilter}}</span><span
              class="viewnum f_r">浏览（<a>{{blog.viewNum}}</a>）</span><span class="pingl f_r">评论（<a>{{blog.commentsNum}}</a>）</span>
            </p>
          </ul>
        </div>
      </div>
      <div class="view-more" v-if="this.filterBlogs.length >= 6" @click="goMore()">查看更多</div>
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
      <div class="ad300x100"><img v-lazy="images.ad300x100"></div>
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
              <li v-for="(rank,index) in clickRankList"><a>{{rank.articleTitle}}</a></li>
            </ul>
          </div>
          <div class="bd bd-news">
            <ul>
              <li v-for="(news,index) in newsList"><a>{{news.articleTitle}}</a></li>
            </ul>
          </div>
          <div class="bd bd-news">
            <ul>
              <li v-for="(comm,index) in recommend"><a>{{comm.articleTitle}}</a></li>
            </ul>
          </div>
        </div>
        <!--ms-main end -->
      </div>
      <!--切换卡 moreSelect end -->

      <div class="cloud">
        <h3>标签云</h3>
        <ul>
          <li v-for="(flag,index) in flagList" @click="goBlogList(index)"><a>{{flag.techniqueInfo}}</a></li>
        </ul>
      </div>
      <div class="ad"><img v-lazy="images.b3"></div>
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
  import {getFormatDateByLong} from '../../assets/js/date-format'

  export default {
    props: ['swipeList','images','titleList','blogs','clickRankList','newsList','recommend','flagList'],
    data () {
      return {
        filterBlogs: []
      }
    },
    methods: {
      chooseTitle (index) {
        this.filterBlogs =  this.blogs.filter(blog => {
          let type = blog.articleType;
          return this.titleList[index] === (type? type=== 1? '生活驿站': '轻松时刻':'技术杂谈')
        });
      },
      goBlogList (index) {
        this.$store.commit('CHANGE_COMPONENT_STATE', {
          componentName: 'BlogList',
          data: {
            flag: JSON.stringify(this.flagList[index])
          }
        });
      },
      goMore () {
        this.$store.commit('CHANGE_COMPONENT_STATE', {
          componentName: 'BlogList'
        });
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

    },
    filters: {
      typeFilter (type) {
        return type? type=== 1? '生活驿站': '轻松时刻':'技术杂谈'
      },
      timeFilter (time) {
        return getFormatDateByLong(time, 'yyyy-MM-dd');
      }
    },
    watch: {
      blogs (val) {
        this.filterBlogs = val;
        this.$store.commit('SAVE_BLOG_LIST', val);
      },
      flagList (val) {
        this.$store.commit('SAVE_FLAG_LIST', val);
      }
    },
    components: {
      Swipe,
      SwipeItem
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .article-desc {
    height:66px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .view-more {
    height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: bolder;
    width: 100%;
    margin: 10px auto;
    border-radius: 5px;
    line-height: 40px;
    background-color: #F4A460;
    color:#fff;
  }
  .choose-title {
    display: block;
    width: 60px;
    height: 36px;
    border-radius: 3px;
    text-align: center;
    margin-right: 10px;
    color: #fff;
    &:nth-child(1) {
      background-color: #33cccc;
    }
    &:nth-child(2) {
      background-color: #FF8247;
    }
    &:nth-child(3) {
      background-color: #33cc00;
    }
  }
</style>
