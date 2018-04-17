<template>
  <div class="wrap">
    <!-- Main -->
    <div class="container">
      <choose-box v-if="openBoxFlag" @closeModal="closeModal()" @confirmModal="confirmModal" :flagList="flagList"></choose-box>
      <div class="panel panel-default">
        <div class="panel-heading">
          <i class="iconfont icon-dingdan"></i> 写文章
        </div>
        <div class="panel-body">
          <div id="message"></div>
          <form class="form-horizontal" action="/post/submit" method="post" enctype="multipart/form-data">
            <div class="form-group">
              <label class="col-sm-2 control-label no-padding-right">标题</label>
              <div class="col-sm-8 has-error">
                <input type="text" class="form-control" name="title" maxlength="128" data-required="">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label no-padding-right">发布到</label>
              <div class="col-sm-3">
                <select class="form-control" name="channelId">
                  <option value="1">博客</option>
                  <option value="2">分享</option>
                  <option value="3">问答</option>
                  <option value="4">招聘</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label no-padding-right">内容</label>
              <div class="col-sm-8 col-mavon">
                <div class="mavon-editor-1" v-if="!openBoxFlag">
                  <mavon-editor v-model="value"/>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label no-padding-right">标签</label>
              <div class="col-sm-8  col-flag-1">
                <i class="iconfont icon-tianjia" @click="openChooseBox()"></i>
                <div class="cloud cloud-choose-flag">
                  <div class="cloud-box">
                    <ul>
                      <li v-for="(flag,index) in chooseFlagList">
                        <a>{{flag.flagInfo}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="form-group">
                <div class="text-center">
                  <button type="submit" class="btn btn-primary">提交</button>
                </div>
              </div>
            </div>
          </form>
          <!-- /form-actions -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChooseBox from '../../components/chooseBox/ChooseBox.vue';
export default {
  data () {
    return {
      openBoxFlag: false,
      flagList: this.$store.state.home.flagCacheList,
      chooseFlagList: []
    }
  },
  methods: {
    openChooseBox () {
      this.openBoxFlag = true;
    },
    closeModal () {
      this.openBoxFlag = false;
    },
    confirmModal (data) {
      this.chooseFlagList = [];
      for (var i=0;i<data.length;i++) {
        if (!data[i])
          this.chooseFlagList.push(this.flagList[i]);
      }
      console.log(this.chooseFlagList);
      this.openBoxFlag = false;
    }
  },
  components: {
    ChooseBox
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .wrap {
    position: relative;
    background-color: #f1f1f1;
    margin-top: 51px;
    margin-bottom: 30px;
    min-height: 600px;
    padding: 30px 0;
  }
  .mavon-editor-1 {
    border: 1px solid #c5c5c5;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    visibility: inherit !important;
    position: relative;
    margin: 0;
    padding: 0;
    outline: 0;
    vertical-align: top;
    background: transparent;
    text-decoration: none;
    color: #595959;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 14px;
    text-shadow: none;
    float: none;
    height: auto;
    white-space: nowrap;
    cursor: inherit;
    -webkit-tap-highlight-color: transparent;
    line-height: normal;
    font-weight: normal;
    text-align: left;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    direction: ltr;
    max-width: none;
  }
  .col-sm-2 {
    width: 8%;
  }
  .col-sm-8 {
    width: 90%;
    &.col-mavon {
      min-height: 300px;
    }
    &.col-flag-1 {
      padding-top: 7px;
    }
    .icon-tianjia {
      cursor: pointer;
      color: #8ec31e;
      font-size: 30px;
      margin-right: 10px;
      vertical-align: middle;
    }
  }
  .cloud-choose-flag {
    ul {
      margin: 0;
    }
  }
</style>
