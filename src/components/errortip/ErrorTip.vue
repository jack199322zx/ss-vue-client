<template>
  <div class="error-tip" v-show="errorTip.flag">
    <div class="mask-transparent"></div>
    <div class="toast">
      <p class="loading-text">{{errorTip.content}}</p>
    </div>
  </div>
</template>
<script>
  export default{
    computed: {
      errorTip: function () {
        return this.$store.state.home.errorTip;
      },
      flag: function () {
        return this.$store.state.home.errorTip.flag;
      }
    },
    watch: {
      flag: function (val) {
        if (val) {
          setTimeout(function () {
            this.$store.commit('CLOSE_ERROR_TIP');
          }.bind(this), 2000);
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .error-tip{
    .mask-transparent {
      position: fixed;
      z-index: 5001;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
    .toast {
      position: fixed;
      z-index: 50000;
      width: 15.6em;
      min-height: 5.6em;
      top: 180px;
      left: 50%;
      transform: translateX(-50%);
      margin-left: 0;
      background: rgba(40, 40, 40, 0.75);
      text-align: center;
      border-radius: 5px;
      color: #ffffff;
      display: flex;
      align-items: center;
      .loading-text {
        font-size: 14px;
        padding: 0px 10px;
        width: 100%;
      }
    }
  }
</style>
