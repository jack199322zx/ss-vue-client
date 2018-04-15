<template>
  <div>
    <Head :loginStatus="loginStatus" :user="userInfo" @logout="doLogout()"></Head>
    <div class="wrap">
      <!-- Main -->
      <div class="container container-box">
        <div class="row streams">
          <div class="col-xs-12 col-md-9 side-left">
            <div class="panel panel-default">
              <div class="panel-heading">
                <ul class="list-inline topic-filter">
                  <li data-toggle="tooltip" title="" data-original-title="发布时间排序">
                    <a href="?order=newest" class="active">最近</a>
                  </li>
                  <li data-toggle="tooltip" title="" data-original-title="点赞数排序">
                    <a href="?order=favors">投票</a>
                  </li>
                  <li data-toggle="tooltip" title="" data-original-title="评论次数排序">
                    <a href="?order=hottest">热门</a>
                  </li>
                </ul>
                <div class="clearfix"></div>
              </div>


              <div class="panel-body remove-padding-horizontal">

                <ul class="list-group row topic-list">
                  <li class="list-group-item " v-for="(item, index) in filterList">
                    <a class="reply_count_area hidden-xs pull-right" href="#">
                      <div class="count_set">
                        <span class="count_of_votes" data-toggle="tooltip" title="" data-original-title="阅读数">3</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_replies" data-toggle="tooltip" title="" data-original-title="回复数">0</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_visits" data-toggle="tooltip" title="" data-original-title="点赞数">0</span>
                        <span class="count_seperator">|</span>
                        <abbr class="timeago">23小时前</abbr>
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
                        <span class="hidden-xs label label-default  ">博客</span>
                        <a href="/view/1">{{item.articleDesc}}</a>
                      </div>
                    </div>
                  </li>

                </ul>
              </div>

              <div class="panel-footer text-right remove-padding-horizontal pager-footer">
                <!-- Pager -->

                <ul class="pagination">
                  <li class="disabled"><span>上一页</span></li>

                  <li class="active"><span>{{pageIndex}}</span></li>

                  <li class="disabled"><span>下一页</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-3 side-right">
            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-area-chart"></i> 热门文章</h3>
              </div>
              <div class="panel-body">
                <ul class="list" id="hots">
                  <li>1. <a href="/view/1">呵呵呵额达</a></li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-bars"></i> 最新发布</h3>
              </div>
              <div class="panel-body">
                <ul class="list" id="latests">
                  <li>1. <a href="/view/1">呵呵呵额达</a></li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-users "></i> 热门用户</h3>
              </div>
              <div class="panel-body remove-padding-horizontal">
                <ul class="hotusers" id="hotuser">
                  <li><a href="/users/2"><img src="/store/ava/000/00/00/02_100.jpg" class="avatar avatar-small"></a></li>
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
  import Head from '../../components/header/Head.vue'
  import auth from '../../auth'
  import '../../assets/styles/style.css'
  import images from '../../common/img/imgPath';
  export default {
    data () {
      return {
        loginStatus: 0,
        userInfo: {
          userName: '',
          id: ''
        },
        pageIndex: 1,
        pageCount: 1,
        articleList: [],
        flagList: [],
        filterList: [],
        clickRankList: [],
        recommend: [],
        newsList: [],
        images: images
      }
    },
    created () {
      this.$http.api({
        url: '/blog/check-login',
        successCallback: function (data) {
          if (data === 'failed') {
            this.loginStatus = 0;
          } else {
            this.loginStatus = 1;
            this.userInfo.userName = data.userName;
            this.userInfo.id = data.id;
          }
          this.$http.api({
            url: '/blog/blog-list',
            successCallback: function (data) {
              this.filterList = this.articleList = data.newCommentsSortedList;
              this.pageCount = data.pageCount;
              this.flagList = data.flagList;
              this.clickRankList = data.viewNumSortedList;
              this.newsList = data.createTimeSortedList;
              this.recommend = data.newCommentsSortedList;
            }.bind(this)
          });
        }.bind(this)
      });
    },
    methods: {
      doLogout() {
        this.loginStatus = 0;
        auth.logout();
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

  .side-right {
    padding: 0 15px 0 15px;
    margin-left: 0;
  }

  .container-box {
    padding-top: 40px;
  }
</style>
