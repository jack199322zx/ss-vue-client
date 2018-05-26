<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <div class="cloud">
        <div class="cloud-box">
          <h3>建站笔录</h3>
          <div class="markdown-body-1 " style="font-size: 20px;">
<pre><code class="hljs lua"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">websiteDesc</span><span class="hljs-params">()</span></span> {
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'你所敲过的代码都必将化为利刃'</span>)；
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'为你劈开一条通往圣殿之路'</span>);
  console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'那么，你还在等什么'</span>);
  alert(<span class="hljs-string">'还不赶紧敲代码...'</span>);

  <span class="hljs-comment">---------------------------------</span>
  回归正题，
  起于兴致，建站于<span class="hljs-number">2018</span>年<span class="hljs-number">5</span>月<span class="hljs-number">23</span>日。
  致力于分享、收集各类技术博文，生活逸事。
  未完待续...
}
</code></pre>

          </div>
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
        showTop: false
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
