<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <div class="cloud">
        <div class="cloud-box">
          <h3>友情链接</h3>
          <ul>
            <li v-for="(link, index) in linkList"><a :href="link.address" target="_blank">{{link.name}}</a></li>
          </ul>
        </div>
      </div>
      <!-- Main -->
      <div class="container container-box">
        <div class="row streams">
        </div>
      </div>
    </div>
    <Footer :showTop="showTop"></Footer>
  </div>
</template>

<script>
  import Footer from '../../components/foot/Footer.vue';
  import Head from '../../components/header/Head.vue';
  import auth from '../../auth';

export default {
  data () {
    return {
      showTop: false,
      linkList: [
        {name: 'JSON在线', address: 'https://www.sojson.com/blog/'},
        {name: '沈唁志的个人博客', address: 'https://qq52o.me/'},
        {name: 'mtons社区', address: 'http://mtons.com/dock/mblog'},
        {name: '旧城博客', address: 'https://www.oschina.net/p/jiucheng-blog'},
        {name: 'haorooms博客', address: 'http://www.haorooms.com/'},
        {name: '杨青个人博客', address: 'http://www.yangqq.com/'},
        {name: '霍荣博客', address: 'http://www.huorong.group:7002/'}]
    }
  },
  methods: {
    logout () {
      auth.logout();
    }
  },
  components: {
    Footer,
    Head
  }
}
</script>

<style scoped type="less">
  .wrap {
    position: relative;
    background-color: #f1f1f1;
    margin-top: 51px;
    margin-bottom: 30px;
    min-height: 600px;
  }
  .cloud-box {
    padding: 10px 80px;
  }
</style>
