<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <div class="cloud">
        <div class="cloud-box">
          <h3>标签云</h3>
          <ul>
            <li v-for="(flag,index) in flagList" @click="goBlogList(index)"><a>{{flag.flagInfo}}</a></li>
          </ul>
        </div>
      </div>
      <!-- Main -->
      <div class="container container-box">
        <div class="row streams">
          <div class="col-xs-12 col-md-9 side-left">
            <div class="panel panel-default">
              <div class="panel-heading">
                <ul class="list-inline topic-filter">
                  <li data-toggle="tooltip" title="" data-original-title="生活区">
                    <a :class="{'active':activeFlag[0]}" @click="chooseDist(0)">生活区</a>
                  </li>
                  <li data-toggle="tooltip" title="" data-original-title="技术区">
                    <a :class="{'active':activeFlag[1]}" @click="chooseDist(1)">技术区</a>
                  </li>
                  <li data-toggle="tooltip" title="" data-original-title="资源下载">
                    <a :class="{'active':activeFlag[2]}" @click="chooseDist(2)">资源</a>
                  </li>
                </ul>
                <div class="clearfix"></div>
              </div>
              <div class="panel-body remove-padding-horizontal">

                <ul class="list-group row topic-list">
                  <li class="list-group-item " v-for="(item, index) in articleList" @click="goArticleDetailByDist(index)">
                    <a class="reply_count_area hidden-xs pull-right">
                      <div class="count_set">
                        <span class="count_of_votes" data-toggle="tooltip" title="" data-original-title="阅读数">{{item.viewNum}}</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_replies" data-toggle="tooltip" title="" data-original-title="回复数">{{item.commentsNum}}</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_visits" data-toggle="tooltip" title="" data-original-title="点赞数">{{item.favoriteNum}}</span>
                        <span class="count_seperator">|</span>
                        <abbr class="timeago">{{item.updateTime| commentsTimeFilter}}前</abbr>
                      </div>
                    </a>
                    <div class="avatar pull-left">
                      <a>
                        <div style="width:55px;height:57px;overflow: hidden">
                          <img class="media-object img-thumbnail avatar avatar-middle"
                               :src="item.articleImg">
                        </div>
                      </a>
                    </div>
                    <div class="infos">
                      <div class="media-heading">
                        <a>{{item.articleTitle}}</a>
                        <div>
                          <span class="hidden-xs label label-default" v-for="flag in item.flagList" style="margin-right:10px">{{flag.flagInfo}}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="panel-footer text-right remove-padding-horizontal pager-footer">
                <!-- Pager -->
                <ul class="pagination">
                  <li :class="{'disabled': prevDisabledFlag}" @click="goPrevPage()"><span>上一页</span></li>
                  <li class="active"><span>{{pageIndex + 1}}</span></li>
                  <li :class="{'disabled': nextDisabledFlag}" @click="goNextPage()"><span>下一页</span></li>
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
                  <li v-for="(item, index) in hotList">{{index + 1}}. <a @click="goArticleDetailByHot(item)">{{item.articleTitle}}</a>
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
                  <li v-for="(item, index) in newsList">{{index + 1}}. <a @click="goArticleDetailByNew(item)">{{item.articleTitle}}</a></li>
                </ul>
              </div>
            </div>

            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title"><i class="fa fa-bars"></i> 最多评论</h3>
              </div>
              <div class="panel-body">
                <ul class="list">
                  <li v-for="(item, index) in commentsMostList">{{index + 1}}. <a @click="goArticleDetailByComments(item)">{{item.articleTitle}}</a></li>
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
  import '../../../assets/styles/style.css'
  import images from '../../../common/img/imgPath';
  import Head from '../../../components/header/Head.vue'
  import auth from '../../../auth';

  export default {
    data() {
      return {
        pageIndex: 0,
        pageCount: 0,
        flagList: [],
        articleList: [],
        hotList: [],
        commentsMostList: [],
        newsList: [],
        images: images,
        activeFlag: [true, false, false],
        dist: 0
      }
    },
    created() {
      this.$http.api({
        url: '/blog/blog-list',
        successCallback: function (data) {
          this.articleList = data.articleDistList;
          this.commentsMostList = data.newCommentsSortedList;
          this.pageCount = data.pageCount;
          this.flagList = data.flagList;
          this.$store.commit('SAVE_FLAG_LIST', this.flagList);
          this.hotList = data.viewNumSortedList;
          this.newsList = data.createTimeSortedList;
        }.bind(this)
      });
    },
    methods: {
      logout () {
        auth.logout();
      },
      chooseDist(type) {
        this.activeFlag.fill(false);
        this.$set(this.activeFlag, type, true);
        this.dist = type;
        this.queryArticlesByDist(type);
      },
      queryArticlesByDist(type) {
        let articleCache = this.$store.state.home.articleCacheList[type];
        //有缓存则走缓存
        if (articleCache) {
          this.articleList = articleCache.articleListDist;
          this.pageIndex = articleCache.currentPage;
          this.pageCount = articleCache.pageCount;
          return
        }
        this.pageIndex = 0;
        this.$http.api({
          url: '/blog/init',
          params: {page: this.pageIndex, dist: type},
          successCallback: function (data) {
            this.articleList = data.articleList;
            this.pageCount = data.pageCount;
            this.$store.commit('SAVE_CACHE_ARTICLE_DIST', {
              articleListDist: this.articleList,
              currentPage: this.pageIndex,
              pageCount: this.pageCount,
              cacheIndex: this.dist
            })
          }.bind(this)
        });
      },
      goNextPage() {
        if (this.nextDisabledFlag) return;
        this.queryArticlesByDistAndPage(++this.pageIndex);
      },
      goPrevPage() {
        if (this.prevDisabledFlag) return;
        this.queryArticlesByDistAndPage(--this.pageIndex);
      },
      queryArticlesByDistAndPage(pageIndex) {
        this.$http.api({
          url: '/blog/init',
          params: {page: pageIndex, dist: this.dist},
          successCallback: function (data) {
            this.articleList = data.articleList;
            //更新缓存
            this.$store.commit('UPDATE_CACHE_ARTICLE_DIST', {
              articleListDist: this.articleList,
              currentPage: this.pageIndex,
              pageCount: this.pageCount,
              cacheIndex: this.dist
            })
          }.bind(this)
        });
      },
      goArticleDetailByDist (index) {
//        let articleId = this.articleList[index].articleId
//        this.$router.push('/article-detail/' + articleId);
        this.chooseRouterPush( this.articleList[index]);
      },
      goArticleDetailByHot (item) {
        this.chooseRouterPush(item);
      },
      goArticleDetailByNew (item) {
        this.chooseRouterPush(item);
      },
      goArticleDetailByComments (item) {
        this.chooseRouterPush(item);
      },
      chooseRouterPush (article) {
        this.$router.push('/article-detail/' + article.articleId);
      }
    },
    computed: {
      nextDisabledFlag() {
        let index = this.pageIndex + 1;
        return index === this.pageCount;
      },
      prevDisabledFlag() {
        let index = this.pageIndex + 1;
        return index === 1
      }
    },
    filters: {
      commentsTimeFilter (val) {
        let time = ((new Date()).getTime() - val)/1000;
        if (time < 60) {
          return Math.trunc(time) + '秒';
        }else if(time < 3600) {
          return Math.trunc(time/60) + '分钟'
        }else if(time < 3600 * 60){
          return Math.trunc(time/(60*60)) + '小时';
        }else return Math.trunc(time/(60*24*60)) + '天';
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

  .media-heading {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal;
  }

  .cloud-box {
    padding: 10px 80px;
  }

  .list-inline {
    a {
      cursor: pointer;
    }
  }
  .topic-list .list-group-item {
    height: 77px;
  }
</style>
