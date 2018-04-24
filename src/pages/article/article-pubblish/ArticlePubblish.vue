<template>
  <div>
    <Head @logout="logout"></Head>
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
            <div class="form-horizontal">
              <div class="form-group">
                <label class="col-sm-2 control-label no-padding-right">标题</label>
                <div class="col-sm-8 has-error">
                  <input type="text" class="form-control" name="title" maxlength="128" data-required="" v-model="title">
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label no-padding-right">发布到</label>
                <div class="col-sm-3">
                  <select class="form-control" name="channelId" v-model="channelId">
                    <option value="1">生活区</option>
                    <option value="2">技术区</option>
                    <option value="3">资源</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label no-padding-right">内容</label>
                <div class="col-sm-8 col-mavon">
                  <div class="mavon-editor-1" v-if="!openBoxFlag">
                    <mavon-editor v-model="mavonValue" @imgAdd="$imgAdd" @imgDel="$imgDel" ref="md"/>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-2 control-label no-padding-right">签名</label>
                <div class="col-sm-8 has-error">
                  <input type="text" class="form-control" name="sign" maxlength="128" data-required="" v-model="sign">
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
                    <button type="submit" class="btn btn-primary" @click="saveForm()">提交</button>
                  </div>
                </div>
              </div>
            </div>
            <!-- /form-actions -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ChooseBox from '../../../components/chooseBox/ChooseBox.vue';
  import auth from '../../../auth/index';
  import Head from '../../../components/header/Head.vue';
export default {
  data () {
    return {
      openBoxFlag: false,
      flagList: this.$store.state.home.flagCacheList,
      chooseFlagList: [],
      mavonValue: '',
      title: '',
      sign: '',
      channelId: '',
      backUrl: '',
      imgList: []
    }
  },
  methods: {
    logout () {
      auth.logout();
    },
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('image', $file);
      this.$http.uploadApi({
        url: 'article/img-upload',
        params: formdata,
        successCallback: function (data) {
          this.backUrl = data.replace(/\\/g,'/');
          this.imgList.push({ filename: pos, url: this.backUrl});
          this.$refs.md.$imgUpdateByUrl('./0', this.backUrl)
          this.$refs.md.$img2Url(pos, this.backUrl);
        }.bind(this)
      });
    },
    $imgDel (filename) {
      let filterImgList = this.imgList.filter(img => img.filename === filename);
      if (filterImgList) {
        let url = filterImgList[0].url;
        let file = url.substring(url.lastIndexOf('/')+ 1);
        console.log(file);
        this.$http.api({
          url: 'article/img-delete',
          params: {file},
          successCallback: function (data) {
            if (data === 'ok') {
              this.mavonValue = this.mavonValue.replace(/!(.*?)\)/, '');
              return
            }
            this.$store.commit('OPEN_ERROR_TIP', '删除图片失败！')
          }.bind(this)
        });
      }
    },
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
      this.openBoxFlag = false;
    },
    saveForm () {
      if (!this.title) {
        this.alertTip('标题不能为空！');
        return
      }
      if (!this.channelId) {
        this.alertTip('类型不能为空！');
        return
      }
      if (!this.mavonValue) {
        this.alertTip('内容不能为空！');
        return
      }
      if (this.chooseFlagList.length === 0) {
        this.alertTip('标签不能为空！');
        return
      }
      let staff_key = auth.getData(auth.STAFF_KEY);
      if (staff_key) {
        var userId = JSON.parse(staff_key).id;
      }
      this.$http.api({
        url: '/article/submit',
        emulateJSON: false,
        params: {
          user: {id:userId},
          flagList: this.chooseFlagList,
          markdown: this.mavonValue,
          title: this.title,
          sign: this.sign,
          channelId: this.channelId
        },
        successCallback: function (data) {
          console.log(data);
        }.bind(this)
      });
    },
    alertTip (tip) {
      this.$store.commit('OPEN_ERROR_TIP', tip);
    }
  },
  components: {
    ChooseBox,
    Head
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
