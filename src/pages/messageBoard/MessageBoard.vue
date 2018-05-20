<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <div class="wrap-sohu">
        <div id="SOHUCS" sid=""></div>
      </div>
    </div>
    <Footer :showTop="showTop"></Footer>
  </div>
</template>

<script>
  import Head from '../../components/header/Head.vue';
  import Footer from '../../components/foot/Footer.vue';
  import auth from '../../auth';

  export default {
    data () {
      return {
        showTop: false
      }
    },
    mounted () {
      require('../../assets/share/js/sohu-changyan');
      window.changyan.api.config({
        appid: 'cytzsetGI',
        conf: 'prod_4bd8a388450c3ad88f1d969a10e9872a'
      });
    },
    methods: {
      logout() {
        auth.logout();
      },
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
    margin-bottom: 0;
    padding-bottom: 30px;
    padding-left: 30px;
    padding-right: 30px;
    min-height: 600px;
    .wrap-sohu {
      padding: 20px;
      background-color: white;
    }
  }
</style>
