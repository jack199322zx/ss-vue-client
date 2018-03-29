<template>
  <div v-show="tip.isShow">
    <MaskLayer></MaskLayer>
    <div class="prompt-dialog-box">
      <div class="prompt-dialog-box-title">{{tip.title}}</div>
      <div class="prompt-dialog-box-content">
        <div>
          <div v-show="tip.showIcon">
            <i v-if="tip.type" class="icon iconfont dialog-icon-success">&#xe7ab;</i>
            <i v-else="tip.type" class="icon iconfont dialog-icon-fail">&#xe7a3;</i>
          </div>
          <p class="dialog-content">{{tip.text}}</p>
        </div>
      </div>
      <div class="prompt-dialog-box-foot">
        <a @click="closeDialogBox" class="dialog-close">{{tip.confirmHint}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import MaskLayer from '../loadPlayer/MaskLayer.vue';
  import { CLOSE_PROMPTD_DIALOG_BOX } from '../../store/mutation-types';

  export default {
    computed: {
      tip () {
        return this.$store.state.home.tipInfo;
      }
    },
    methods: {
      closeDialogBox () {
        this.$store.commit(CLOSE_PROMPTD_DIALOG_BOX);
      }
    },
    components: {
      MaskLayer
    }
  };
</script>

<style scoped lang="less">
  @import '../../assets/less/base';
  .prompt-dialog-box{position: fixed;height: 300px;width: 500px;background-color: white;z-index: 10001;
    top:50%;left:50%;margin-left: -250px;margin-top: -150px}
  .prompt-dialog-box-title{height: 40px;line-height: 40px;font-size: 16px;padding-left: 20px;background-color: #f5f5f5;color: @title-color}
  .prompt-dialog-box-content{height: 190px;text-align: center;    padding: 0px 60px;display: flex;display: -webkit-flex; flex-direction:column;justify-content:center}
  .dialog-icon-success{font-size: 53px !important;color: #8ec31d}
  .dialog-icon-fail{font-size: 53px!important;color: #e8b92d}
  .dialog-content{font-size: 16px;margin-top: 10px;color: @title-color;word-break: break-all;}
  .prompt-dialog-box-foot{height: 60px;text-align: center;}
  .dialog-close{display: inline-block;width: 350px;height: 44px;line-height:44px;color: white;background-color: @blue-color;border-radius: 5px}
</style>
