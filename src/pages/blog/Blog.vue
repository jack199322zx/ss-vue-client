<template>
  <div>
    <Header :headList="headList"></Header>
    <keep-alive>
      <component :is="currentView">
        <!-- 非活动组件将被缓存！ -->
      </component>
    </keep-alive>
    <footer>
      <p class="ft-copyright" style="padding-top:20px"><b style="font-size:30px">Welcome to Nino's blog</b><br><br>-------------- Life doesn't just happen to you; you receive everything in your life based on what you've given</p>
      <div id="tbox"><a id="togbook" href="/"></a> <a id="gotop" href="javascript:void(0)"></a></div>
    </footer>
  </div>
</template>

<script>
  import Header from '../../components/header/Head.vue';
  import Home from '../../pages/home/Home.vue';
  import BlogList from '../../pages/blog-list/BlogList.vue';
  import { mapState } from 'vuex';
  export default {
    data() {
      return {
        headList: ['首页','关于我','博文','小助手','相册','留言板']//这里由于开发时间有限，写死了一些数据，实际开发当以从数据库取
      }
    },
    methods: {

    },
    computed: {
      ...mapState({
        currentView: state => state.home.componentInfo.componentName
      })
    },
    components: {
      Header,
      Home,
      BlogList
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  #slide-img-1 {
    width:100%;
    height:100%;
  }
  #tbox {
    position:fixed;
    left:0;
    bottom:100px;
  }
</style>
