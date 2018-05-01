<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <div class="container container-box">
        <div class="row main">
          <div class="col-xs-12 col-md-9 side-left topics-show">
            <!-- view show -->
            <div class="topic panel panel-default" ref="topic">
              <div class="infos panel-heading">
                <div class="infos-flex">
                  <h1 class="panel-title topic-title">{{articleTitle}}</h1>
                  <div class="text-center padding-md">
                    <a class="btn btn-default btn-sm" @click="saveFavorite()" data-id="1"
                       rel="favor">
                      <i :class="['icon','icon-like',{'icon-like-favorite': favoriteFlag}]"></i>喜欢
                      {{favoriteNum}}
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
                  <p v-html="articleDesc" v-highlight></p><br>
                  <div style="margin:20px auto; text-align:center; font-size:12px;font-weight: bolder;">
                    {{articleSign}}
                  </div>
                  <span id="comments-tip">注意：本文归作者所有，未经作者允许，不得转载</span>
                </div>
              </div>
              <div class="panel-footer operate">
                    <span>
                      <a style="margin-right:10px;" class="label label-default"
                         v-for="flag in flagList">#{{flag.flagInfo}}</a>
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
                          src="https://qq52o.me/wp-content/themes/c7v5/img/tip_qrcode_wechatpay.jpg"
                          alt="wechat"><span>微信赞赏</span>
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
            <div id="chat" class="chats shadow-box">
              <div class="chat_other">
                <h4>全部评论: <i id="chat_count">{{comments.length}}</i> 条</h4>
              </div>
              <ul id="chat_container" class="its">
                <li v-for="(comm, index) in comments">
                  <a class="avt fl" target="_blank" href="">
                    <img :src="comm.user.avatar">
                  </a>
                  <div class="chat_body">
                    <h5 style="display: flex;justify-content: space-between">
                      <div class="fl"><a class="chat_name"
                                         href="/users/2">{{comm.user.userCode}}</a>
                      </div>
                      <div class="fr reply_this">
                        <span style="padding-right:20px;">{{comm.createTime | timeFilter}}</span>
                        <a href="javascript:void(0);" @click="goto(index)">[回复]</a>
                      </div>
                    </h5>
                    <div class="chat_p">
                      <div class="chat_pct" v-html="comm.commentContent"></div>
                      <div class="quote" v-if="comm.toCommentId"><a
                        href="/users/2">@{{comm.toComment.user.userCode}}</a>:
                        <span v-html="comm.toComment.commentContent"></span>
                      </div>
                    </div>
                  </div>
                  <div class="clear"></div>
                  <div class="chat_reply"></div>
                </li>
              </ul>
              <div class="text-center-1" style="text-align:center"></div>
              <div class="cbox-wrap">
                <div class="cbox-title">我有话说: <span id="chat_reply" style="display:none;">@<i
                  id="chat_to"></i></span>
                </div>
                <div class="cbox-post">
                  <div class="cbox-input">
                    <textarea id="chat_text" rows="3" placeholder="请输入评论内容" v-model="chatText"></textarea>
                  </div>
                  <div class="cbox-ats clearfix">
                    <div class="ats-func">
                      <ul class="func-list">
                        <li class="list-b">
                          <a href="javascript:void(0);" class="join" id="c-btn"
                             style="text-decoration: none"><i
                            class="iconfont icon-emotion"
                            style="font-size:20px" @click="showEmoji = !showEmoji"></i></a>
                        </li>
                      </ul>
                    </div>
                    <div class="ats-issue">
                      <button id="btn-chat" class="btn btn-success btn-sm bt"
                              @click="submitComment()">发送
                      </button>
                    </div>
                  </div>
                </div>
                <div class="phiz-box" id="c-phiz" style="display:none">
                  <div class="phiz-list" view="c-phizs"></div>
                </div>
                <div class="emoji-div-1">
                  <Emoji v-if="showEmoji" class="emoji-div-2" @select="selectEmoji"
                         @closeEmotion="closeEmotionBox"></Emoji>
                </div>
              </div>
            </div>
            <!--<div id="SOHUCS" sid="请将此处替换为配置SourceID的语句"></div>-->

            <!-- /view show -->
          </div>
          <div class="col-xs-12 col-md-3 side-right hidden-xs hidden-sm">
            <ul class="list-group about-user">
              <li class="list-group-item user-card">
                <div class="ava">
                  <a href="/users/2">
                    <img class="img-circle" :src="avatar">
                  </a>
                </div>
                <div class="user-info">
                  <div class="nk mb10">{{userName}}</div>
                  <div class="mb6">
                    <a class="btn btn-default btn-xs" @click="saveFollow()" data-id="2"
                       rel="follow">
                      <i class="iconfont icon-gengduojiaru" style="font-size:12px;"
                         v-if="!followFlag"></i> {{followFlag ?
                      '已关注' : '关注'}}</a>

                  </div>
                </div>
              </li>

              <li class="list-group-item">
                <div class="user-datas">
                  <ul>
                    <li><strong>{{publishNum}}</strong><span>发布</span></li>
                    <li class="noborder"><strong>{{commentsNum}}</strong><span>评论</span></li>
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
                  <li v-for="(item, index) in hotList">{{index + 1}}. <a
                    @click="chooseRouter(0, index)">{{item.articleTitle}}</a>
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
                  <li v-for="(item, index) in newsList">{{index + 1}}. <a
                    @click="chooseRouter(1, index)">{{item.articleTitle}}</a>
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
                  <li v-for="(item, index) in commentsMostList">{{index + 1}}. <a
                    @click="chooseRouter(2, index)">{{item.articleTitle}}</a>
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
                  <li><a href="/users/2"><img src="/dist/images/ava/default.png"
                                              class="avatar avatar-small"></a></li>
                  <li><a href="/users/1"><img src="/dist/images/ava/default.png"
                                              class="avatar avatar-small"></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer :showTop="showTop"></Footer>
  </div>
</template>

<script>
  import share from '../../../assets/share/js/social-share-minx';
  import Head from '../../../components/header/Head.vue';
  import Footer from '../../../components/foot/Footer.vue';
  import Emoji from '../../../components/emoji/Emoji.vue';
  import auth from '../../../auth/index';
  import '../../../assets/styles/huimarkdown.css'
  import {getFormatDateByLong} from '../../../assets/js/date-format'

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
        commentsNum: 0,
        favoriteNum: 0,
        hotList: [],
        newsList: [],
        commentsMostList: [],
        articleSign: '',
        articleId: this.$route.params.id,
        favoriteFlag: false,
        followFlag: false,
        authorId: '',
        comments: [],
        commentId: '',
        chatText: '',
        showTop: false,
        readyComment: {},
        avatar: '',
        showEmoji: false
      }
    },
    created() {
      this.queryArticleDetail(this.articleId);
    },
    mounted: function () {    //钩子函数，等于vue1.0中的ready
      share.alReady(function () {
        window.socialShare('.social-share, .share-component');
      });
      window.addEventListener('scroll', () => {
        this.showTop = window.scrollY > window.innerHeight * 0.5;
      }, false);
//      require('../../../assets/share/js/sohu-changyan');
//      window.changyan.api.config({
//        appid: 'cytzsetGI',
//        conf: 'prod_4bd8a388450c3ad88f1d969a10e9872a'
//      });
    },
    methods: {
      submitComment () {
        this.$http.api({
          url: '/comment/save-comment',
          params: {
            articleId: this.articleId,
            commentContent: this.chatText,
            toCommentId: this.commentId
          },
          emulateJSON: false,
          successCallback: function (data) {
            if (data === 'failed') {
              return this.$store.commit('OPEN_ERROR_TIP', '保存失败！');
            }
            this.comments.unshift({
              articleId: data.articleId,
              commentContent: data.commentContent,
              commentId: data.commentId,
              toCommentId: data.toCommentId,
              createTime: new Date().getTime(),
              user: {
                userCode: this.$store.state.home.userInfo.userCode,
                avatar: this.$store.state.home.userInfo.userAvatar
              },
              toComment: this.readyComment
            });
            this.chatText = '';
          }.bind(this)
        });
      },
      goto(index) {
        let commentId = this.comments[index].commentId;
        console.log(commentId);
        console.log(index);
        let userCode = this.comments[index].user.userCode;
        document.getElementById('chat_text').scrollIntoView();
        $('#chat_text').focus();
        this.chatText = '';
        $('#chat_to').text(userCode);
        this.commentId = commentId;
        $('#chat_reply').show();
        this.readyComment = this.comments[index];
      },
      logout() {
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
            url: '/user/save-favorite',
            params: {articleId: this.articleId, userId: userId},
            successCallback: function () {
              this.favoriteNum++;
              this.favoriteFlag = !this.favoriteFlag;
            }.bind(this)
          });
        } else {
          this.$http.api({
            url: '/user/cancel-favorite',
            params: {articleId: this.articleId, userId: userId},
            successCallback: function () {
              this.favoriteNum--;
              this.favoriteFlag = !this.favoriteFlag;
            }.bind(this)
          });
        }
      },
      saveFollow() {
        let staff_key = auth.getData(auth.STAFF_KEY);
        if (staff_key) {
          var userId = JSON.parse(staff_key).id;
        }
        if (this.authorId === userId.toString()) {
          this.$store.commit('OPEN_ERROR_TIP', '您不能关注自己');
          return
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
      showPayInfo() {
        this.payShow = true
      },
      closePayInfo() {
        this.payShow = false
      },
      closeEmotionBox () {
        this.showEmoji = false;
      },
      chooseRouter(type, index) {
        type ? type === 1 ? this.routerView(this.newsList[index]) : this.routerView(this.commentsMostList[index]) : this.routerView(this.hotList[index]);
      },
      routerView(article) {
        location.href = location.href.replace(/(#\/).*/g, '$1article-detail/' + article.articleId);
        this.queryArticleDetail(article.articleId);
      },
      selectEmoji (code) {
        this.showEmoji = false
        this.chatText += this.$emoji(code);
      },
      queryArticleDetail(articleId) {
        this.$http.api({
          url: '/blog/blog-detail',
          params: {articleId},
          successCallback: function (data) {
            this.flagList = data.article.flagList;
            this.viewNum = data.article.viewNum;
            this.publishTime = data.article.createTime;
            this.userName = data.article.user.userName;
            this.authorId = data.article.user.id;
            this.avatar = data.article.user.avatar;
            this.articleTitle = data.article.articleTitle;
            this.articleDesc = data.article.articleDesc;
            this.publishNum = data.publishNum;
            this.commentsNum = data.commentsNum;
            this.favoriteNum = data.article.favoriteNum;
            this.hotList = data.viewNumSortedList;
            this.newsList = data.createTimeSortedList;
            this.commentsMostList = data.commentsSortedList;
            this.articleSign = data.article.articleSign;
            this.comments = data.commentList;
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
          return Math.trunc(time) + '秒';
        } else if (time < 3600) {
          return Math.trunc(time / 60) + '分钟'
        } else if (time < 3600 * 60) {
          return Math.trunc(time / (60 * 60)) + '小时';
        } else return Math.trunc(time / (60 * 24 * 60)) + '天';
      },
      timeFilter(time) {
        return getFormatDateByLong(time, 'yyyy-MM-dd');
      }
    },
    computed: {
      userId() {
        return this.$store.state.home.userInfo.userId;
      }
    },
    components: {
      Head,
      Footer,
      Emoji
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  .wrap {
    position: relative;
    background-color: #f1f1f1;
    margin-top: 51px;
    margin-bottom: 0;
    padding-bottom: 30px;
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

  .chats {
    background: #fff;
    .chat_other {
      border-bottom: 1px solid #e5e5e5;
    }
    h4 {
      margin: 5px;
      display: block;
      height: 40px;
      line-height: 40px;
      font-weight: 500;
      font-size: 14px;
      text-indent: 10px;
    }
    .its {
      padding-left: 15px;
      padding-right: 15px;
    }
  }

  .cbox-wrap {
    padding: 15px;
    .cbox-title {
      margin-bottom: 10px;
      font-weight: 500;
    }
    .cbox-post {
      border: 1px solid #ccc;
    }
  }

  .phiz-box {
    padding-top: 10px;
    text-align: center;
  }

  .shadow-box {
    margin-bottom: 15px;
    border: 1px solid #ebebeb;
    border-radius: 0;
  }

  .emoji-div-1 {
    position: relative;
    .emoji-div-2 {
      position: absolute;
      left: 0;
      bottom: 36px;
      box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
      background: white;
    }
  }

</style>
