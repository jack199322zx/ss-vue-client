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
                  <a href="/users/2">
                    <img class="img-circle" src="/dist/images/ava/default.png">
                  </a>
                </div>
                <div class="user-info">
                  <div class="nk mb10">sweeettttt</div>
                  <div class="mb6">
                    <a class="btn btn-success btn-xs" @click="goModifyHome()"><i class="icon icon-note"></i> 修改账户</a>
                  </div>
                </div>
              </li>
            </ul>
            <nav class="navbar navbar-default shadow-box background-white">
              <div class="container-fluid">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="navbar-header visible-xs">
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#home-navbar" aria-expanded="false">
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
                    <a href="/user"><i class="iconfont icon-jiatingdongtai"></i> 动态</a>
                  </li>
                  <li class="list-group-item">
                    <a href="/user?method=posts"><i class="iconfont icon-caidan"></i> 我的文章</a>
                  </li>
                  <li class="list-group-item">
                    <a href="/user?method=comments"><i class="iconfont icon-xiaoxidongtai"></i> 我的评论</a>
                  </li>
                </ul>

                <ul class="list-group user-nav">
                  <li class="list-group-item">
                    <a href="/user?method=favors"><i class="iconfont icon-xinweixuanzhong"></i> 我的喜欢</a>
                  </li>
                  <li class="list-group-item">
                    <a href="/user?method=follows"><i class="iconfont icon-dingyue"></i> 我的关注</a>
                  </li>
                  <li class="list-group-item">
                    <a href="/user?method=fans"><i class="iconfont icon-wode"></i> 我的粉丝</a>
                  </li>
                </ul>

                <ul class="list-group user-nav">
                  <li class="list-group-item">
                    <a href="/user?method=notifies">
                      <i class="iconfont icon-xinxi"></i> 通知
                      <span class="label label-default">0</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="col-xs-12 col-md-9 side-right">
            <div class="panel panel-default">
              <div class="panel-heading">
                动态
              </div>

              <div class="panel-body remove-padding-horizontal">
                <ul class="list-group topic-list">
                  <li class="list-group-item " style="padding: 0 15px;">
                    <a class="reply_count_area hidden-xs pull-right" href="#">
                      <div class="count_set">
                        <span class="count_of_votes" title="阅读数">4</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_replies" title="回复数">0</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_visits" title="点赞数">0</span>
                        <span class="count_seperator">|</span>
                        <abbr class="timeago">6天前</abbr>
                      </div>
                    </a>
                    <div class="avatar pull-left">
                      <a href="/users/2">
                        <img class="media-object img-thumbnail avatar avatar-middle" src="../../../assets/images/default.png">
                      </a>
                    </div>
                    <div class="infos">
                      <div class="media-heading">
                        <a href="/view/1">啊啊啊啊啊啊</a>
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
  </div>
</template>

<script>
  import auth from '../../../auth/index';
  import Head from '../../../components/header/Head.vue';
export default {
  methods: {
    logout () {
      auth.logout();
    },
    goModifyHome () {
      this.$router.push('/home-modify/' +  this.$store.state.home.userInfo.userId);
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

  .item-zhuye-1 {
    font-size: 18px;
    color: #777;
  }
</style>
