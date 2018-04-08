<template>
  <Article :swipeList="swipeList"
           :images="imgPath"
           :titleList="titleList"
           :blogs="blogList"
           :clickRankList="clickRankList"
           :newsList="newsList"
           :recommend = "authorRecommend"
           :flagList="flagList">
  </Article>
</template>

<script>
  import blog from '../../common/img/imgPath';
  import Article from '../../components/article/Article.vue';
export default {
  data() {
    return {
      imgPath: blog,
      swipeList: [{path: blog.a1}, {path: blog.a2}, {path: blog.a3}, {path:blog.a4}],
      titleList: ['技术杂谈','生活驿站','轻松时刻'],
      blogList: [],
      clickRankList: [],
      newsList: [],
      authorRecommend: [],
      flagList: []
    }
  },
  created() {
    this.$http.api({
      url: '/blog/init',
      successCallback: function (data) {
        this.blogList = data.articleList;
        this.clickRankList = data.viewNumSortedList;
        this.newsList = data.createTimeSortedList;
        this.authorRecommend = data.authorRecList;
        this.flagList = data.flagList;
      }.bind(this)
    });
  },
  components: {
    Article
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
