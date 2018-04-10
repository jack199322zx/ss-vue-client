<template>
  <div class="topnews">
    <div class="cloud">
      <h3 style="font-weight: bolder">所有标签</h3>
      <div style="padding:0 0 20px 30px;height: 120px;">
        <ul>
          <li v-for="(flag,index) in flagList" @click="chooseArticleByFlag(index)"><a>{{flag.techniqueInfo}}</a></li>
        </ul>
      </div>
    </div>
    <h2>
          <span style="display: flex">
            <a class="choose-title" @click="chooseTitle(index)" v-for="(title,index) in titleList">{{title}}</a>
          </span><b>全部</b>文章
    </h2>
    <div class="blogs" v-for="(blog, index) in filterList">
      <figure><img :src="images.a1"></figure>
      <ul>
        <h3><a>{{blog.articleTitle}}</a></h3>
        <p class="article-desc">{{blog.articleDesc}}</p>
        <p class="autor"><span class="lm f_l"><a href="/">{{blog.articleType|typeFilter}}</a></span><span
          class="dtime f_l">{{blog.createTime|timeFilter}}</span><span
          class="viewnum f_r">浏览（<a>{{blog.viewNum}}</a>）</span><span class="pingl f_r">评论（<a>{{blog.commentsNum}}</a>）</span>
        </p>
        <p class="cloud">
          <ul style="float:left">
            <li v-for="(tech,index) in blog.techniqueList"><a>{{tech.techniqueInfo}}</a></li>
          </ul>
        </p>
      </ul>
    </div>
  </div>
</template>

<script>
  import blog from '../../common/img/imgPath';
  export default {
    name: 'BlogList',
    data () {
      return {
        filterList: [],
        blogList: [],
        pageIndex: 0,
        flagList: [],
        titleList: ['技术杂谈', '生活驿站', '轻松时刻'],
        images: blog
      }
    },
    methods: {
      chooseTitle (index) {
        this.filterList = this.blogList.filter(blog => {
          let type = blog.articleType;
          return this.titleList[index] === (type ? type === 1 ? '生活驿站' : '轻松时刻' : '技术杂谈')
        });
      },
      chooseArticleByFlag (index) {
        this.filterList = this.blogList.filter(blog => {
          let flag = false;
          blog.techniqueList.forEach(tech => {
            if (tech.techniqueInfo === this.flagList[index].techniqueInfo)
              flag = true
          })
          return flag
        })

      }
    },
    computed: {
      receiveFlag () {
        return JSON.parse(this.$store.state.home.componentInfo.data.flag);
      }
    },
    filters: {
      typeFilter (type) {
        return type ? type === 1 ? '生活驿站' : '轻松时刻' : '技术杂谈'
      },
      timeFilter (time) {
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDay();
      }
    },
    created() {
      this.$http.api({
        url: '/blog/blog-list',
        emulateJSON: false,
        params: {
          page: this.pageIndex,
          receiveFlag: this.receiveFlag
        },
        successCallback: function (data) {
          this.filterList = this.blogList = data.articleList;
          this.flagList = data.flagList;
        }.bind(this)
      });
    },
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
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

  .article-desc {
    height: 66px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
</style>
