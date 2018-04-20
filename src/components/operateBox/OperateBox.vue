<template>
  <div class="operate-box" v-show="operateInfo.isShow">
    <div class="mask-transparent"></div>
    <div class="toast">
      <div class="title">操作提示</div>
      <p class="content-1">{{operateInfo.text}}</p>
      <div class="footer">
        <div class="cancel" @click="close">取消</div>
        <div class="sure" @click="confirm">确认</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    computed: {
      operateInfo: function () {
        return this.$store.state.home.operateInfo;
      }
    },
    methods: {
      close () {
        this.$store.commit('CLOSE_OPERATE_DIALOG_BOX');
      },
      confirm () {
        this.$store.commit('SURE_OPERATE_DIALOG_BOX');
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./../../assets/less/base.less";
  .operate-box{
    .mask-transparent {
      position: fixed;
      z-index: 5001;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.5);
    }
    .toast {
      background-color: #fff;
      z-index: 5002;
      position: fixed;
      width: 260px;
      height: 180px;
      top: 50%;
      left: 50%;
      margin-left: -130px;
      margin-top: -90px;
      border-radius: 5px;
      .title{
        line-height: 35px;
        height: 35px;
        background-color: #f5f5f5;
        font-size: 12px;
        color: #5f5f5f;
        padding-left: 10px;
        border-radius: 5px;
      }
      .content-1{
        width: 220px;
        height: 100px;
        margin: 0 auto;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0px 20px;
      }
      .footer{
        position: absolute;
        bottom: 0px;
        display: flex;
        width: 100%;
        height: 40px;
        font-size: 14px;
        line-height: 40px;
        border-top: 1px solid gainsboro;
        .sure{
          width: 50%;
          text-align: center;
          color: @base-color;
          border-left: 1px solid gainsboro;
        }
        .cancel{
          width: 50%;
          text-align: center;
        }
      }
    }
  }
</style>
