<template>
  <div>
    <Head @logout="logout"></Head>
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
  import { mapState } from 'vuex';
  import auth from '../../auth';

  export default {
    methods: {
      logout () {
        auth.logout();
      }
    },
    computed: {
      ...mapState({
        currentView: state => state.home.componentInfo.componentName
      })
    },
    created () {
//      this.$store.commit('CHANGE_COMPONENT_STATE', {
//        componentName: 'BlogContent'
//      });
    },
    components: {
      Head,
      BlogContent,
      ArticlePublish
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
