<template>
  <div>
    <Head :loginStatus="loginStatus" :user="userInfo" @logout="doLogout()"></Head>
    <keep-alive>
      <component :is="currentView">
        <!-- 非活动组件将被缓存！ -->
      </component>
    </keep-alive>
  </div>

</template>

<script>
  import Head from '../../components/header/Head.vue'
  import BlogContent from '../../pages/blog-list/BlogContent.vue';
  import ArticlePublish from '../../pages/article-pubblish/ArticlePubblish.vue';
  import ArticleDetail from '../../pages/article-detail/ArticleDetail.vue';
  import { mapState } from 'vuex';
  import auth from '../../auth'

  export default {
    data () {
      return {
        loginStatus: 0,
        userInfo: {
          userName: '',
          id: ''
        }
      }
    },
    methods: {
      doLogout() {
        this.loginStatus = 0;
        auth.logout();
      }
    },
    computed: {
      ...mapState({
        currentView: state => state.home.componentInfo.componentName
      })
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
        }.bind(this)
      });
      this.$store.commit('CHANGE_COMPONENT_STATE', {
        componentName: 'BlogContent'
      });
    },
    components: {
      Head,
      BlogContent,
      ArticlePublish,
      ArticleDetail
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
