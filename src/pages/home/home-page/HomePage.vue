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
                    <a class="btn btn-success btn-xs" @click="goModifyHome()"><i
                      class="icon icon-note"></i> 修改账户</a>
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
                    <a @click="chooseRouter(0)"><i class="iconfont icon-jiatingdongtai"></i> 动态</a>
                  </li>
                  <li class="list-group-item">
                    <a @click="chooseRouter(1)"><i class="iconfont icon-caidan"></i> 我的文章</a>
                  </li>
                  <li class="list-group-item">
                    <a @click="chooseRouter(2)"><i class="iconfont icon-xiaoxidongtai"></i> 我的评论</a>
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
                      <span class="label label-default">0</span>
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
                <ul class="list-group topic-list notify">
                  <li class="list-group-item " style="padding: 0 15px;">
                    <a class="reply_count_area hidden-xs pull-right" href="#">
                      <div class="count_set">
                        <abbr class="timeago">12分钟前</abbr>
                      </div>
                    </a>
                    <div class="avatar pull-left">
                      <a href="/users/2">
                        <img class="media-object img-thumbnail avatar avatar-middle"
                             src="/store/ava/000/00/00/02_100.jpg">
                      </a>
                    </div>
                    <div class="infos">
                      <div class="media-heading">
                        <a href="/users/2">尼诺啊</a>
                        <span>
                                            发表了新文章 - <a href="/view/5">萨达萨达撒</a>
                                    </span>
                      </div>
                    </div>
                  </li>
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
                <ul class="list-group">
                  <li class="list-group-item" el="loop-5">
                    <a href="/view/5" class="remove-padding-left">萨达萨达撒</a>
                    <span class="meta">
                      1 点赞
                      <span> ⋅ </span>
                      1 回复
                      <span> ⋅ </span>
                      <span class="timeago">7天前</span>
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
                <ul class="list-group">
                  <li class="list-group-item" el="loop-1">
                    <a href="/view/1" class="remove-padding-left">呵呵呵额达</a>
                    <span class="meta">
								<span class="timeago">12天前</span>
      						</span>

                    <div class="pull-right hidden-xs">
                      <a class="act" href="javascript:void(0);" data-evt="trash" data-id="1" data-toggle="tooltip"
                         title="" data-original-title="删除评论">
                        <i class="icon icon-close"></i>
                      </a>
                    </div>

                    <div class="reply-body markdown-reply content-body">
                      <p>asdsaasdasd</p>
                    </div>
                  </li>
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
                <ul class="list-group">
                  <li class="list-group-item" el="loop-5">
                    <a href="/view/5" class="remove-padding-left">萨达萨达撒</a>
                    <span class="meta">
								1 点赞
								<span> ⋅ </span>
								1 回复
								<span> ⋅ </span>
								<span class="timeago">7天前</span>
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
                <ul data-v-2c42365f="" class="hotusers">
                  <li data-v-2c42365f="">
                    <a data-v-2c42365f="" href="/users/2">
                      <img data-v-2c42365f="" src="/store/ava/000/00/00/02_100.jpg" class="avatar avatar-small">
                    </a></li>
                  <li data-v-2c42365f=""><a data-v-2c42365f="" href="/users/1">
                    <img data-v-2c42365f="" src="/dist/images/ava/default.png" class="avatar avatar-small">
                  </a></li>
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
                <ul data-v-2c42365f="" id="hotuser" class="hotusers">
                  <li data-v-2c42365f="">
                    <a data-v-2c42365f="" href="/users/2">
                      <img data-v-2c42365f="" src="/store/ava/000/00/00/02_100.jpg" class="avatar avatar-small">
                    </a></li>
                  <li data-v-2c42365f=""><a data-v-2c42365f="" href="/users/1">
                    <img data-v-2c42365f="" src="/dist/images/ava/default.png" class="avatar avatar-small">
                  </a></li>
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
                <ul class="list-group topic-list notify">
                  <li class="list-group-item " style="padding: 0 15px;">
                    <a class="reply_count_area hidden-xs pull-right" href="#">
                      <div class="count_set">
                        <abbr class="timeago">12分钟前</abbr>
                      </div>
                    </a>
                    <div class="avatar pull-left">
                      <a href="/users/2">
                        <img class="media-object img-thumbnail avatar avatar-middle"
                             src="/store/ava/000/00/00/02_100.jpg">
                      </a>
                    </div>
                    <div class="infos">
                      <div class="media-heading">
                        <a href="/users/2">尼诺啊</a>
                        <span>
                                            喜欢了你的文章 - <a href="/view/5">萨达萨达撒</a>
                                    </span>
                      </div>
                    </div>
                  </li>
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
    data () {
      return {
        showTop: false,
        showIndex: ''
      }
    },
    methods: {
      logout () {
        auth.logout();
      },
      goModifyHome () {
        this.$router.push('/home-modify/' + this.$store.state.home.userInfo.userId);
      },
      chooseRouter (index) {
        this.showIndex = index;
      },
      queryHomePageInfo (index) {
        let staff_key = auth.getData(auth.STAFF_KEY);
        if (staff_key) {
          var userId = JSON.parse(staff_key).id;
        }
        switch (index) {
          case 0:
            this.$http.api({
              url: '/home/query-dynamics',
              params: {userId},
              successCallback: function (data) {
                console.log(data)
              }.bind(this)
            })
            return;
          case 1:
            this.$http.api({
              url: '/home/query-my-articles',
              params: {userId},
              successCallback: function (data) {
                console.log(data)
              }.bind(this)
              })
            return;
          case 2:
            this.$http.api({
              url: '/home/query-my-comments',
              params: {userId},
              successCallback: function (data) {
                console.log(data)
              }.bind(this)
            })
            return;
          case 3:
            this.$http.api({
              url: '/',
              params: {},
              successCallback: function () {

              }.bind(this)
            })
            return;
          case 4:
            this.$http.api({
              url: '/',
              params: {},
              successCallback: function () {

              }.bind(this)
            })
            return;
          case 6:
            this.$http.api({
              url: '/home/query-my-notify',
              params: {userId},
              successCallback: function (data) {
                console.log(data);
              }.bind(this)
            })
            return;
          default:
            ;
        }
      }
    },
    computed: {
      avatar () {
        return this.$store.state.home.userInfo.userAvatar;
      },
      userCode () {
        return this.$store.state.home.userInfo.userCode;
      },
      homeIndex () {
        return this.$route.query.homeIndex;
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => vm.showIndex = to.query.homeIndex)
    },
    watch :{
      homeIndex (val) {
        this.showIndex = val;
      },
      showIndex (val) {
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
</style>
