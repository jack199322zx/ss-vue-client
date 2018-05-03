<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <!-- Main -->
      <div class="container container-box">
        <div class="row users-show streams">
          <div class="col-xs-12 col-md-3 side-left">

            <ul class="list-group about-user">
              <li class="list-group-item item-zhuye-1">
                <i class="iconfont icon-zhuye" style="padding-right: 15px;"></i>我的主页
              </li>
              <li class="list-group-item user-card">
                <div class="ava">
                  <a>
                    <img class="img-circle" :src="$util.imgPath(avatar)">
                  </a>
                </div>
                <div class="user-info">
                  <div class="nk mb10">{{userCode}}</div>
                  <div class="mb6">
                    <a class="btn btn-success btn-xs" @click="goModifyHome()">修改账户</a>
                  </div>
                </div>
              </li>
            </ul>
            <nav class="navbar navbar-default shadow-box background-white">
              <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header visible-xs">
                  <button type="button" class="navbar-toggle" data-toggle="collapse"
                          data-target="#home-navbar" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <span class="navbar-brand">导航</span>
                </div>
              </div>
              <div id="home-navbar" class="navbar-collapse in" style="height: auto;">
                <ul class="list-group user-nav first">
                  <li class="list-group-item">
                    <a @click="chooseRouter(0)"><i class="iconfont icon-xiaoxidongtai"></i> 动态</a>
                    <span class="label label-default" v-if="dynamicNum">{{dynamicNum}}</span>
                  </li>
                  <li class="list-group-item">
                    <a @click="chooseRouter(1)"><i class="iconfont icon-caidan"></i> 我的文章</a>
                  </li>
                  <li class="list-group-item">
                    <a @click="chooseRouter(2)"><i class="iconfont icon-jiatingdongtai"></i> 我的评论</a>
                  </li>
                </ul>

                <ul class="list-group user-nav">
                  <li class="list-group-item">
                    <a @click="chooseRouter(3)"><i class="iconfont icon-xinweixuanzhong"></i>
                      我的喜欢</a>
                  </li>
                  <li class="list-group-item">
                    <a @click="chooseRouter(4)"><i class="iconfont icon-dingyue"></i> 我的关注</a>
                  </li>
                  <li class="list-group-item">
                    <a @click="chooseRouter(5)"><i class="iconfont icon-wode"></i> 我的粉丝</a>
                  </li>
                </ul>

                <ul class="list-group user-nav">
                  <li class="list-group-item">
                    <a @click="chooseRouter(6)">
                      <i class="iconfont icon-xinxi"></i> 通知
                      <span class="label label-default" v-if="notifyNum">{{notifyNum}}</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="col-xs-12 col-md-9 side-right">
            <div class="panel panel-default" v-if="showIndex==0">
              <div class="panel-heading">
                动态
              </div>
              <div class="panel-body remove-padding-horizontal">
                <ul class="list-group topic-list notify" v-if="dynamicList && dynamicList.length> 0">
                  <li class="list-group-item " style="padding: 0 15px;" v-for="(item, index) in dynamicList"
                      @click="goArticleByDynamic(item.feed)">
                    <a class="reply_count_area hidden-xs pull-right">
                      <div class="count_set">
                        <abbr class="timeago">{{item.article.createTime | timeFilter}}前</abbr>
                      </div>
                    </a>
                    <div class="avatar pull-left">
                      <a>
                        <img class="media-object img-thumbnail avatar avatar-middle"
                             :src="$util.imgPath(item.userAvatar)">
                      </a>
                    </div>
                    <div class="infos">
                      <div class="media-heading">
                        <a>{{item.userName}}</a>
                        <span>发表了新文章 - <a>{{item.article.articleTitle}}</a></span>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="list-group topic-list notify" v-else>
                  当前还没有发现动态哟~
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
            <div class="panel panel-default" v-if="showIndex==1">
              <div class="panel-heading">
                我的文章
              </div>
              <div class="panel-body">
                <ul class="list-group" v-if="myArticleList && myArticleList.length> 0">
                  <li class="list-group-item" el="loop-5" v-for="(item, index) in myArticleList"
                      @click="goArticleDetail(item.articleId)">
                    <a class="remove-padding-left">{{item.articleTitle}}</a>
                    <span class="meta">
                      <span> ⋅ </span>
                      {{item.favoriteNum}} 喜欢
                      <span> ⋅ </span>
                      {{item.commentsNum}} 回复
                      <span> ⋅ </span>
                      {{item.viewNum}} 浏览
                      <span class="timeago">{{item.createTime | timeFilter}}前</span>
                    </span>
                    <div class="pull-right hidden-xs">
                      <a class="act_edit" @click.stop.prevent="editArticle(item.articleId)" data-evt="edit" data-id="5"
                         data-toggle="tooltip"
                         title="" data-original-title="编辑文章">
                        <i class="iconfont icon-bianji1"></i>
                      </a>
                      <a class="act_delete" @click.stop.prevent="delArticle(item.articleId, index)" data-evt="trash"
                         data-id="5"
                         data-toggle="tooltip" title="" data-original-title="删除文章">
                        <i class="iconfont icon-guanbi"></i>
                      </a>
                    </div>
                  </li>
                </ul>
                <ul class="list-group" v-else>
                  当前还没有发表文章哟~ 快去发表文章吧！
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
            <div class="panel panel-default" v-if="showIndex==2">
              <div class="panel-heading">
                我的评论
              </div>
              <div class="panel-body">
                <ul class="list-group" v-if="myCommentsList && myCommentsList.length> 0">
                  <li class="list-group-item" el="loop-1" v-for="(comm, index) in myCommentsList">
                    <a href="/view/1" class="remove-padding-left">{{comm.article.articleTitle}}</a>
                    <span class="meta">
								<span class="timeago">{{comm.comment.createTime | timeFilter}}前</span>
      						</span>
                    <div class="pull-right hidden-xs">
                      <a class="act" @click="delComment(comm.comment)" data-evt="trash" data-id="1"
                         data-toggle="tooltip"
                         title="" data-original-title="删除评论">
                        <i class="icon icon-close"></i>
                      </a>
                    </div>
                    <div class="reply-body markdown-reply content-body">
                      <p v-html="comm.comment.commentContent"></p>
                    </div>
                  </li>
                </ul>
                <ul class="list-group" v-else>
                  当前还没有评论哟~ 快去发表评论吧！
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
            <div class="panel panel-default" v-if="showIndex==3">
              <div class="panel-heading">
                我的喜欢
              </div>
              <div class="panel-body">
                <ul class="list-group" v-if="myFavoritesList && myFavoritesList.length> 0">
                  <li class="list-group-item" el="loop-5" v-for="(item, index) in myFavoritesList">
                    <a href="/view/5" class="remove-padding-left">{{item.articleTitle}}</a>
                    <span class="meta">
                      	<span> ⋅ </span>
								        {{item.favoriteNum}} 喜欢
						          	<span> ⋅ </span>
                        {{item.commentsNum}} 回复
                        <span> ⋅ </span>
                         {{item.viewNum}} 浏览
								<span class="timeago">{{item.createTime | timeFilter}}前</span>
      						</span>

                    <div class="pull-right hidden-xs">
                      <a class="act_edit" href="javascript:void(0);" data-evt="edit" data-id="5" data-toggle="tooltip"
                         title="" data-original-title="编辑文章">
                        <i class="icon icon-note"></i>
                      </a>
                      <a class="act_delete" href="javascript:void(0);" data-evt="trash" data-id="5"
                         data-toggle="tooltip" title="" data-original-title="删除文章">
                        <i class="icon icon-close"></i>
                      </a>
                    </div>
                  </li>
                </ul>
                <ul class="list-group" v-else>
                  当前还没有喜欢的文章哟~
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
            <div class="panel panel-default" v-if="showIndex==4">
              <div class="panel-heading">
                我的关注
              </div>
              <div class="panel-body remove-padding-horizontal">
                <ul class="hotusers" v-if="myFollowList && myFollowList.length> 0">
                  <li v-for="(item, index) in myFollowList">
                    <a href="/users/2">
                      <img :src="$util.imgPath(item.avatar)" class="avatar avatar-small">
                      <div class="user-avatar-span">{{item.userCode}}</div>
                    </a></li>
                </ul>
                <ul class="hotusers" v-else>
                  当前还没有关注的人哦~
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
            <div class="panel panel-default" v-if="showIndex==5">
              <div class="panel-heading">
                我的粉丝
              </div>
              <div class="panel-body remove-padding-horizontal">
                <ul class="hotusers" v-if="myFansList && myFansList.length> 0">
                  <li v-for="(item, index) in myFansList">
                    <a href="/users/2">
                      <img :src="$util.imgPath(item.avatar)" class="avatar avatar-small">
                      <div class="user-avatar-span">{{item.userCode}}</div>
                    </a></li>
                </ul>
                <ul class="hotusers" v-else>
                  当前还没有粉丝哟~
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
            <div class="panel panel-default" v-if="showIndex==6">
              <div class="panel-heading">
                通知
              </div>
              <div class="panel-body remove-padding-horizontal">
                <ul class="list-group topic-list notify" v-if="notifyList && notifyList.length> 0">
                  <li class="list-group-item " style="padding: 0 15px;" v-for="(item, index) in notifyList"
                      @click="goArticleByNotify(item.notify)">
                    <a class="reply_count_area hidden-xs pull-right">
                      <div class="count_set">
                        <abbr class="timeago">{{item.notify.createTime | timeFilter}}前</abbr>
                      </div>
                    </a>
                    <div class="avatar pull-left">
                      <a>
                        <img class="media-object img-thumbnail avatar avatar-middle"
                             :src="$util.imgPath(item.user.avatar)">
                      </a>
                    </div>
                    <div class="infos">
                      <div class="media-heading">
                        <a>{{item.user.userName}}</a>
                        <span v-if="item.notify.eventType===1">喜欢了你的文章 - <a>{{item.article.articleTitle}}</a></span>
                        <span v-if="item.notify.eventType===2">关注了你</span>
                        <span v-if="item.notify.eventType===3">评论了你的文章 - <a>{{item.article.articleTitle}}</a></span>
                        <span v-if="item.notify.eventType===4">在 <a>{{item.article.articleTitle}}</a> 文章中回复了你  </span>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="list-group topic-list notify" v-else>
                  当前还没有通知哟~
                </ul>
              </div>
              <div class="panel-footer">
                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>
                  <li class="active"><span>1</span></li>
                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- /end -->
      </div>
    </div>
    <Footer @showTop="showTop"></Footer>
  </div>
</template>

<script>
  import auth from '../../../auth/index';
  import Head from '../../../components/header/Head.vue';
  import Footer from '../../../components/foot/Footer.vue';

  export default {
    data() {
      return {
        showTop: false,
        showIndex: '',
        dynamicList: [],
        myArticleList: [],
        myCommentsList: [],
        notifyList: [],
        myFavoritesList: [],
        myFollowList: [],
        myFansList: [],
        notifyPageIndex: 0
      }
    },
    methods: {
      logout() {
        auth.logout();
      },
      goModifyHome() {
        this.$router.push('/home-modify/' + this.$store.state.home.userInfo.userId);
      },
      goArticleDetail(articleId) {
        this.$router.push('/article-detail/' + articleId);
      },
      editArticle(articleId) {
        this.$router.push('/article-publish/' + articleId);
      },
      delComment(comment) {
        this.$store.commit('OPEN_OPERATE_DIALOG_BOX', {
          'text': '确定要删除该评论吗',
          sureCallback: () => {
            this.$http.api({
              url: '/article/delete-article',
              emulateJSON: false,
              params: {
                commentId: comment.commentId,
                articleId: comment.articleId,
                userId: comment.userId,
                toCommentId: comment.toCommentId
              },
              successCallback: function (data) {
                data === 1 ? this.$store.commit('OPEN_ERROR_TIP', '删除成功！') : this.$store.commit('OPEN_ERROR_TIP', '操作失败！')
                this.myCommentsList.splice(index, 1)
              }.bind(this)
            })
          }
        });
      },
      delArticle(articleId, index) {
        this.$store.commit('OPEN_OPERATE_DIALOG_BOX', {
          'text': '确定要删除该文章吗',
          sureCallback: () => {
            this.$http.api({
              url: '/article/delete-article',
              params: {articleId},
              successCallback: function (data) {
                data === 1 ? this.$store.commit('OPEN_ERROR_TIP', '删除成功！') : this.$store.commit('OPEN_ERROR_TIP', '操作失败！')
                this.myArticleList.splice(index, 1)
              }.bind(this)
            })
          }
        });
      },
      goArticleByNotify(notify) {
        this.$http.api({
          url: '/home/read-notify',
          params: {
            notifyId: notify.notifyId,
            associationId: notify.associationId,
            fromId: notify.fromId,
            toId: notify.toId,
            eventType: notify.eventType
          },
          emulateJSON: false,
          successCallback: function (data) {
            if (data === 1) {
              if (notify.eventType === 2) {
                return
              }
              this.$router.push('/article-detail/' + notify.associationId)
            }
          }.bind(this)
        })
      },
      goArticleByDynamic(feed) {
        this.$http.api({
          url: '/home/read-dynamic',
          params: {
            feedsId: feed.feedsId,
            associationId: feed.associationId,
            fromId: feed.fromId,
            toId: feed.toId
          },
          emulateJSON: false,
          successCallback: function (data) {
            if (data === 1) {
              this.$router.push('/article-detail/' + feed.associationId)
            }
          }.bind(this)
        })
      },
      chooseRouter(index) {
        this.showIndex = index;
        this.queryHomePageInfo(index);
      },
      queryHomePageInfo(index) {
        if (typeof index === 'string') {
          index = parseInt(index);
        }
        let staff_key = auth.getData(auth.STAFF_KEY);
        if (staff_key) {
          var userId = JSON.parse(staff_key).id;
        } else {
          this.$store.commit('OPEN_ERROR_TIP', '登录信息已失效，请重新登录！')
          return
        }
        switch (index) {
          case 0:
            this.$http.api({
              url: '/home/query-dynamics',
              params: {userId},
              successCallback: function (data) {
                this.dynamicList = data;
              }.bind(this)
            })
            return;
          case 1:
            this.$http.api({
              url: '/home/query-my-articles',
              params: {userId},
              successCallback: function (data) {
                this.myArticleList = data;
              }.bind(this)
            })
            return;
          case 2:
            this.$http.api({
              url: '/home/query-my-comments',
              params: {userId},
              successCallback: function (data) {
                this.myCommentsList = data;
              }.bind(this)
            })
            return;
          case 3:
            this.$http.api({
              url: '/home/query-my-favorites',
              params: {userId},
              successCallback: function (data) {
                this.myFavoritesList = data;
              }.bind(this)
            })
            return;
          case 4:
            this.$http.api({
              url: '/home/query-my-follow',
              params: {userId},
              successCallback: function (data) {
                this.myFollowList = data;
              }.bind(this)
            })
            return;
          case 5:
            this.$http.api({
              url: '/home/query-my-fans',
              params: {userId},
              successCallback: function (data) {
                this.myFansList = data;
              }.bind(this)
            })
            return;
          case 6:
            this.$http.api({
              url: '/home/query-my-notify',
              params: {userId},
              successCallback: function (data) {
                this.notifyList = data;
              }.bind(this)
            })
            return;
          default:
            ;
        }
      }
    },
    filters: {
      timeFilter(val) {
        let time = ((new Date()).getTime() - val) / 1000;
        if (time < 60) {
          return Math.trunc(time) + '秒';
        } else if (time < 3600) {
          return Math.trunc(time / 60) + '分钟'
        } else if (time < 3600 * 24) {
          return Math.trunc(time / (60 * 60)) + '小时';
        } else return Math.trunc(time / (60 * 60 * 24)) + '天';
      }
    },
    computed: {
      avatar() {
        return this.$store.state.home.userInfo.userAvatar;
      },
      userCode() {
        return this.$store.state.home.userInfo.userCode;
      },
      homeIndex() {
        return this.$route.query.homeIndex;
      },
      dynamicNum() {
        return this.$store.state.home.userInfo.dynamicNum;
      },
      notifyNum() {
        return this.$store.state.home.userInfo.notifyNum;
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.showIndex = to.query.homeIndex;
        vm.queryHomePageInfo(vm.showIndex);
      })
    },
    watch: {
      homeIndex(val) {
        this.showIndex = val;
        this.queryHomePageInfo(val);
      }
    },
    components: {
      Head,
      Footer
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

  .item-zhuye-1 {
    font-size: 18px;
    color: #777;
  }

  .topic-list .list-group-item {
    height: 76px;
  }

  .timeago {
    padding-left: 30px;
  }

  .user-avatar-span {
    width: 80px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .hotusers {
    img {
      width: 80px;
      height: 80px;
    }
  }
</style>
