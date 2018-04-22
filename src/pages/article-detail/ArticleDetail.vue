<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <div class="container container-box">
        <div class="row main">
          <div class="col-xs-12 col-md-9 side-left topics-show">
            <!-- view show -->
            <div class="topic panel panel-default">
              <div class="infos panel-heading">
                <div class="infos-flex">
                  <h1 class="panel-title topic-title">{{articleTitle}}</h1>
                  <div class="text-center padding-md">
                    <a class="btn btn-default btn-sm" @click="saveFavorite()" data-id="1" rel="favor">
                      <i :class="['icon','icon-like',{'icon-like-favorite': favoriteFlag}]"></i>喜欢 {{favoriteNum}}
                    </a>
                  </div>
                </div>
                <div class="meta inline-block">
                  <a class="author" href="/users/2">
                    作者：{{userName}}
                  </a>
                  <div>
                    <span class="timeago">{{publishTime | publishTimeFilter}}前 /</span>
                    <span>{{viewNum}} 阅读</span>
                  </div>
                </div>
                <div class="clearfix"></div>
              </div>
              <div class="content-body entry-content panel-body ">
                <div class="markdown-body">
                  <p v-html="articleDesc"></p><br>
                  <div style="margin:20px auto; text-align:center; font-size:12px;font-weight: bolder;">
                    {{articleSign}}
                  </div>
                  <span id="comments-tip">注意：本文归作者所有，未经作者允许，不得转载</span>
                </div>
              </div>
              <div class="panel-footer operate">
                    <span>
                      <a style="margin-right:10px;" class="label label-default" v-for="flag in flagList">#{{flag.flagInfo}}</a>
                    </span>
              </div>
              <div class="panel-footer operate">
                <div class="entry-footer wp">
                  <div class="tip-box" @mouseout="closePayInfo()">
                    <div class="tip-button" @mouseover="showPayInfo()">
                      赞赏
                      <div class="tip-popover" v-show="payShow">
                        <div class="tip-alipay"><img
                          src="https://qq52o.me/wp-content/themes/c7v5/img/tip_qrcode_alipay.jpg"
                          alt="alipay"><span>支付宝赞赏</span></div>
                        <div class="tip-wechatpay"><img
                          src="https://qq52o.me/wp-content/themes/c7v5/img/tip_qrcode_wechatpay.jpg" alt="wechat"><span>微信赞赏</span>
                        </div>
                      </div>
                    </div>
                    <p class="tip-desc">如果文章对您有帮助，欢迎给作者打赏</p>
                  </div>
                  <div class="social-share" data-sites="weibo,wechat,qq,qzone,tencent,douban">
                  </div>
                </div>
              </div>
            </div>

            <!-- Comments -->
            <!--<div id="chat" class="chats shadow-box">-->
            <!--<div class="chat_other">-->
            <!--<h4>全部评论: <i id="chat_count">0</i> 条</h4>-->
            <!--</div>-->
            <!--<ul id="chat_container" class="its"></ul>-->
            <!--<div id="pager" class="text-center"></div>-->
            <!--<div class="cbox-wrap">-->
            <!--<div class="cbox-title">我有话说: <span id="chat_reply" style="display:none;">@<i id="chat_to"></i></span>-->
            <!--</div>-->
            <!--<div class="cbox-post">-->
            <!--<div class="cbox-input">-->
            <!--<textarea id="chat_text" rows="3" placeholder="请输入评论内容"></textarea>-->
            <!--<input type="hidden" value="0" name="chat_pid" id="chat_pid">-->
            <!--</div>-->
            <!--<div class="cbox-ats clearfix">-->
            <!--<div class="ats-func">-->
            <!--<ul class="func-list">-->
            <!--<li class="list-b">-->
            <!--<a href="javascript:void(0);" class="join" id="c-btn"><i class="fa fa-smile-o fa-2"></i></a>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--<div class="ats-issue">-->
            <!--<button id="btn-chat" class="btn btn-success btn-sm bt">发送</button>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--<div class="phiz-box" id="c-phiz" style="display:none">-->
            <!--<div class="phiz-list" view="c-phizs"></div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</div>-->
            <div id="SOHUCS" sid="请将此处替换为配置SourceID的语句"></div>

            <!-- /view show -->
          </div>
          <div class="col-xs-12 col-md-3 side-right hidden-xs hidden-sm">
            <ul class="list-group about-user">
              <li class="list-group-item user-card">
                <div class="ava">
                  <a href="/users/2">
                    <img class="img-circle" src="/dist/images/ava/default.png">
                  </a>
                </div>
                <div class="user-info">
                  <div class="nk mb10">{{userName}}</div>
                  <div class="mb6">
                    <a class="btn btn-default btn-xs" @click="saveFollow()" data-id="2" rel="follow">
                      <i class="iconfont icon-gengduojiaru" style="font-size:12px;" v-if="!followFlag"></i>{{followFlag?
                      '已关注': '关注'}}</a>

                  </div>
                </div>
              </li>

              <li class="list-group-item">
                <div class="user-datas">
                  <ul>
                    <li><strong>{{publishNum}}</strong><span>发布</span></li>
                    <li class="noborder"><strong>1</strong><span>评论</span></li>
                  </ul>
                </div>
              </li>
            </ul>
            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-area-chart"></i> 热门文章</h3>
              </div>
              <div class="panel-body">
                <ul class="list" id="hots">
                  <li v-for="(item, index) in hotList">{{index + 1}}. <a @click="chooseRouter(0, index)">{{item.articleTitle}}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-bars"></i> 最新发布</h3>
              </div>
              <div class="panel-body">
                <ul class="list" id="latests">
                  <li v-for="(item, index) in newsList">{{index + 1}}. <a @click="chooseRouter(1, index)">{{item.articleTitle}}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-bars"></i> 最多评论</h3>
              </div>
              <div class="panel-body">
                <ul class="list">
                  <li v-for="(item, index) in commentsMostList">{{index + 1}}. <a @click="chooseRouter(2, index)">{{item.articleTitle}}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-users "></i> 热门用户</h3>
              </div>
              <div class="panel-body remove-padding-horizontal">
                <ul class="hotusers" id="hotuser">
                  <li><a href="/users/2"><img src="/dist/images/ava/default.png" class="avatar avatar-small"></a></li>
                  <li><a href="/users/1"><img src="/dist/images/ava/default.png" class="avatar avatar-small"></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import share from '../../assets/share/js/social-share-minx';
  import Head from '../../components/header/Head.vue';
  import auth from '../../auth';
  import '../../assets/styles/huimarkdown.css'
  export default {
    data() {
      return {
        payShow: false,
        flagList: [],
        viewNum: 0,
        publishTime: '',
        userName: '',
        articleTitle: '',
        articleDesc: '',
        publishNum: 0,
        favoriteNum: 0,
        hotList: [],
        newsList: [],
        commentsMostList: [],
        articleSign: '',
        articleId: this.$route.params.id,
        favoriteFlag: false,
        followFlag: false,
        authorId: ''
      }
    },
    created() {
      this.queryArticleDetail(this.articleId);
    },
    mounted: function () {    //钩子函数，等于vue1.0中的ready
      share.alReady(function () {
        window.socialShare('.social-share, .share-component');
      });
      require('../../assets/share/js/sohu-changyan');
      window.changyan.api.config({
        appid: 'cytzsetGI',
        conf: 'prod_4bd8a388450c3ad88f1d969a10e9872a'
      });
    },
    methods: {
      logout () {
        auth.logout();
        this.favoriteFlag = false;
        this.followFlag = false;
      },
      saveFavorite() {
        let staff_key = auth.getData(auth.STAFF_KEY);
        if (staff_key) {
          var userId = JSON.parse(staff_key).id;
        }
        if (!this.favoriteFlag) {
          this.$http.api({
            url: '/blog/save-favorite',
            params: {articleId: this.articleId, userId: userId},
            successCallback: function () {
              this.favoriteNum++;
              this.favoriteFlag = !this.favoriteFlag;
            }.bind(this)
          });
        } else {
          this.$http.api({
            url: '/blog/cancel-favorite',
            params: {articleId: this.articleId, userId: userId},
            successCallback: function () {
              this.favoriteNum--;
              this.favoriteFlag = !this.favoriteFlag;
            }.bind(this)
          });
        }
      },
      saveFollow () {
        let staff_key = auth.getData(auth.STAFF_KEY);
        if (staff_key) {
          var userId = JSON.parse(staff_key).id;
        }
        if (!this.followFlag) {
          this.$http.api({
            url: '/user/save-follow',
            params: {authorId: this.authorId, followerId: userId},
            successCallback: function () {
              this.followFlag = !this.followFlag;
            }.bind(this)
          });
        } else {
          this.$http.api({
            url: '/user/cancel-follow',
            params: {authorId: this.authorId, followerId: userId},
            successCallback: function () {
              this.followFlag = !this.followFlag;
            }.bind(this)
          });
        }
      },
      postFollow (data) {
        this.followFlag = data;
      },
      postFavorite (data) {
        this.favoriteFlag = data;
      },
      showPayInfo() {
        this.payShow = true
      },
      closePayInfo() {
        this.payShow = false
      },
      chooseRouter (type, index) {
        type ? type === 1 ? this.routerView(this.newsList[index]) : this.routerView(this.commentsMostList[index]) : this.routerView(this.hotList[index]);
      },
      routerView (article) {
        location.href = location.href.replace(/(#\/).*/g, '$1article-detail/' + article.articleId);
        this.queryArticleDetail(article.articleId);
      },
      queryArticleDetail (articleId) {
        this.$http.api({
          url: '/blog/blog-detail',
          params: {articleId},
          successCallback: function (data) {
            this.flagList = data.article.flagList;
            this.viewNum = data.article.viewNum;
            this.publishTime = data.article.createTime;
            this.userName = data.article.user.userName;
            this.authorId = data.article.user.id;
            this.articleTitle = data.article.articleTitle;
            this.articleDesc = data.article.articleDesc;
            this.publishNum = data.publishNum;
            this.favoriteNum = data.article.favoriteNum;
            this.hotList = data.viewNumSortedList;
            this.newsList = data.createTimeSortedList;
            this.commentsMostList = data.newCommentsSortedList;
            this.articleSign = data.article.articleSign;
//          this.articleList = data.articleDistList;
//          this.hotArticleList = data.newCommentsSortedList;
//          this.pageCount = data.pageCount;
            let staff_key = auth.getData(auth.STAFF_KEY);
            if (staff_key) {
              let userId = JSON.parse(staff_key).id;
              this.$http.api({
                url: '/user/query-favorite-follow',
                params: {
                  articleId,
                  userId,
                  authorId: this.authorId
                },
                successCallback: function (data) {
                  this.favoriteFlag = data.favorite === 1;
                  this.followFlag = data.follow === 1;
                }.bind(this)
              });
            }
          }.bind(this)
        });
      }
    },
    filters: {
      publishTimeFilter(val) {
        let time = ((new Date()).getTime() - val) / 1000;
        if (time < 60) {
          return time + '秒';
        } else if (time < 3600) {
          return Math.trunc(time / 60) + '分钟'
        } else if (time < 3600 * 60) {
          return Math.trunc(time / (60 * 60)) + '小时';
        } else return Math.trunc(time / (60 * 24 * 60)) + '天';
      }
    },
    computed: {
      userId () {
        console.log("===============userId=======")
        console.log(this.$store.state.home.userInfo.userId)
        return this.$store.state.home.userInfo.userId;
      }
    },
    components: {
      Head
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .wrap {
    position: relative;
    background-color: #f1f1f1;
    margin-top: 51px;
    margin-bottom: 30px;
    min-height: 600px;
  }

  .container-box {
    padding-top: 40px;
  }

  .panel-heading {
    background-color: #fff;
  }

  .entry-footer {
    margin-bottom: 60px;
  }

  .wp {
    width: 700px;
    margin-right: auto;
    margin-left: auto;
    clear: both;
  }

  .tip-box {
    margin: 20px 0;
    clear: both;
    text-align: center;
  }

  .tip-button {
    position: relative;
    display: inline-block;
    padding: 0 1.5em;
    margin: 0 auto 10px;
    font-size: 18px;
    font-weight: 700;
    line-height: 44px;
    color: #fff;
    cursor: pointer;
    background: #f36;
    border-radius: 22px;
  }

  .tip-popover {
    position: absolute;
    bottom: 100%;
    left: -115px;
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: #333;
    text-align: center;
    cursor: default;
    background: #fff;
    border-radius: 3px;
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    border: 1px solid #eee;
    z-index: 9;
    -webkit-box-shadow: 0 2px 10px #aaa;
    box-shadow: 0 2px 10px #aaa;
    -webkit-transition: all 200ms;
    transition: all 200ms;
    -moz-transition: all 350ms;
  }

  .tip-popover div {
    float: left;
    width: 50%;
  }

  .tip-popover img {
    width: 130px;
    margin: 10px;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border-style: none;
  }

  .tip-popover span {
    display: block;
    margin-bottom: 10px;
  }

  .tip-desc {
    color: #777;
  }

  .social-share {
    float: right;
    text-align: center;
    margin-right: 20px;
  }

  .inline-block {
    color: #888;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    .timeago {
      margin-right: 20px;
    }
  }

  .infos-flex {
    display: flex;
    justify-content: space-between;
  }

  .markdown-body {
    p {
      margin-bottom: 88px;
    }
    #comments-tip {
      font-size: 12px;
    }
  }

  .text-center {
    padding: 10px 0;
  }

  .about-user .user-datas ul .noborder {
    width: 65px;
  }

  .icon-like-favorite {
    color: #EF6D57;
  }
</style>
