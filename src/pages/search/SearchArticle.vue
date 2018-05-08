<template>
  <div>
    <Head @logout="logout" :model="model"></Head>
    <div class="wrap">
      <!-- Main -->
      <div class="container container-box">
        <div class="row streams">
          <div class="col-xs-12 col-md-9 side-left">
            <div class="panel panel-default">
              <div class="panel-body remove-padding-horizontal">
                <ul class="list-group row topic-list" v-if="articleList && articleList.length>0">
                  <li class="list-group-item " v-for="(item, index) in articleList" @click="goArticleDetail(item.articleId)">
                    <a class="reply_count_area hidden-xs pull-right">
                      <div class="count_set">
                        <span class="count_of_votes" data-toggle="tooltip" title=""
                              data-original-title="阅读数">{{item.viewNum}}</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_replies" data-toggle="tooltip" title=""
                              data-original-title="回复数">{{item.commentsNum}}</span>
                        <span class="count_seperator">/</span>
                        <span class="count_of_visits" data-toggle="tooltip" title=""
                              data-original-title="点赞数">{{item.favoriteNum}}</span>
                        <span class="count_seperator">|</span>
                        <abbr class="timeago">{{item.updateTime | timeFilter}}前</abbr>
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
                        <a v-html="item.articleTitle"></a>
                        <div class="item-article-desc" v-html="item.articleDesc" ref="articleDesc"></div>
                        <div>
                          <span class="hidden-xs label label-default" v-for="flag in item.flagList"
                                style="margin-right:10px">{{flag.flagInfo}}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul class="list-group row topic-list" v-else>
                  <li class="list-group-item ">抱歉，未找到相关内容哦~</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-3 side-right">
            <div class="panel panel-default corner-radius panel-hot-topics">
              <div class="panel-heading text-center">
                <h3 class="panel-title">热门搜索</h3>
              </div>
              <div class="panel-body">
                <div class="search-trending">
                  <div class="search-refresh-button" @click="refreshHotSearch()" v-if="searchHotAll && searchHotAll.length>= searchIndex">
                    <i class="iconfont icon-zhongzhi"></i>
                    换一批
                  </div>
                  <div style="clear:both">
                    <ul class="search-trending-tag-wrap">
                      <li v-for="(hot, index) in searchHotList" @click="goRefreshSearch(hot)"><a>{{hot}}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer @showTop="showTop"></Footer>
  </div>
</template>

<script>
  import Head from '../../components/header/Head.vue';
  import Footer from '../../components/foot/Footer.vue';
  import auth from '../../auth';
  export default {
    data() {
      return {
        articleList: [],
        showTop: false,
        searchHotList: [],
        searchHotAll: [],
        searchIndex: 5,
        searchNum: 0
      }
    },
    methods: {
      logout () {
        auth.logout();
      },
      goArticleDetail (id) {
        this.$router.push('/article-detail/' + id);
      },
      goRefreshSearch (hot) {
        location.href = location.href.replace(/(#\/).*/g, '$1search?keywords=' + hot);
      },
      refreshHotSearch () {
        let searchNum = ++this.searchNum;
        let length = this.searchHotAll.length;
        let index = searchNum * this.searchIndex;
        if (index< length) {
          this.searchHotList = this.searchHotAll.slice(index, (index+1)* this.searchIndex);
        }else {
          this.searchHotList = this.searchHotAll.slice(0, this.searchIndex);
          this.searchNum = 0;
        }
      },
      querySearchInfo () {
        this.$http.api({
          url: '/search/search-articles',
          params: {search:this.model},
          successCallback: function (data) {
            this.articleList = data.articleList;
            let searchHotAll = this.searchHotAll = data.hotSearchList;
            if (searchHotAll && searchHotAll.length>= this.searchIndex) {
              this.searchHotList = searchHotAll.slice(0, this.searchIndex)
            }else this.searchHotList = searchHotAll;
          }.bind(this)
        })
      }
    },
    computed: {
      model () {
        return this.$route.query.keywords;
      }
    },
    watch: {
      model () {
        this.querySearchInfo();
      }
    },
    created() {
      this.querySearchInfo();
    },
    filters: {
      timeFilter (val) {
        let time = ((new Date()).getTime() - val)/1000;
        if (time < 60) {
          return Math.trunc(time) + '秒';
        }else if(time < 3600) {
          return Math.trunc(time/60) + '分钟'
        }else if(time < 3600 * 24){
          return Math.trunc(time/(60*60)) + '小时';
        }else return Math.trunc(time/(60*60*24)) + '天';
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

  .side-right {
    padding: 0 15px 0 15px;
    margin-left: 0;
  }
  .container-box {
    padding-top: 40px;
  }
  .topic-list .list-group-item {
    height: 110px;
    padding-top: 15px;
    .item-article-desc {
      width:100%;
      height:40px;
      overflow: hidden;
      font-size: 13px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2
    }
  }
  .remove-padding-horizontal {
    padding-top:0;
  }
  .panel-body .list li{
    background-color: #e5e5e5;
  }
  .streams .topic-list .media-heading {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    white-space: normal;
    padding-top:0;
    a {
      font-size:15px;
      font-weight: 700;
    }
  }

  .search-trending {
    .search-refresh-button {
      float:right;
      i {
        font-size: 12px;
        height:20px;
        color:#969696;
      }
    }
    .search-trending-tag-wrap {
      margin-bottom: 0;
      list-style: none;
      li {
        margin-right: 10px;
        display: inline-block;
        line-height: 28px;
        a {
          padding: 2px 6px;
          font-size: 12px;
          color: #787878;
          border: 1px solid #ddd;
          border-radius: 3px;
          cursor: pointer;
          &:hover {
            color: #000;
          }
        }
      }
    }
  }
</style>
