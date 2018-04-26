<template>
  <div>
    <Head @logout="logout"></Head>
    <div class="wrap">
      <!-- Main -->
      <div class="container container-box">
        <div class="panel panel-default stacked">
          <div class="panel-heading">
            <ul class="nav nav-pills account-tab">
              <li :class="{'active': activeList[0]}"><a @click="goBaseInfo()">基本信息</a></li>
              <li :class="{'active': activeList[1]}"><a @click="goModifyAvatar()">修改头像</a></li>
              <li :class="{'active': activeList[2]}"><a @click="goModifyPwd()">修改密码</a></li>
            </ul>
          </div>
          <div class="panel-body" v-if="chooseRouter===0">
            <div class="tab-pane active" id="profile">
              <form id="pf" action="profile" method="post" class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-lg-3">昵称</label>
                  <div class="col-lg-4">
                    <input type="text" class="form-control" name="name" value="sweeettttt" maxlength="7" data-required="">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-3">邮箱地址</label>
                  <div class="col-lg-4">
                    <span class="form-control">461333622@qq.com</span>
                  </div>
                  <div class="col-lg-3" style="padding-top: 6px;">
                    <span class="label label-warning">未验证</span>
                    <a href="/user/email">修改邮箱</a>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-3">个性签名</label>
                  <div class="col-lg-6">
                    <textarea name="signature" class="form-control" rows="3" maxlength="128"></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">提交</button>
                  </div>
                </div><!-- /form-actions -->
              </form>
            </div>
          </div><!-- /panel-content -->
          <div class="panel-body" v-if="chooseRouter===1">
            <div class="form-horizontal">
              <input type="hidden" id="x" name="x" value="">
              <input type="hidden" id="y" name="y" value="">
              <input type="hidden" id="width" name="width" value="">
              <input type="hidden" id="height" name="height" value="">
              <input type="hidden" id="path" name="path" value="">

              <div class="upload-btn">
                <label>
                  <span>点击选择一张图片</span>
                  <input id="upload_btn" type="file" name="file" accept="image/*" title="点击添加图片" @change="changeAvatar()" ref="avatar">
                </label>
              </div>
              <div class="update_ava">
                <img :src="$util.imgPath(avatar)" id="target" alt="[Example]" style="width: 240px;height:240px">
              </div>

              <div class="form-group">
                <div class="text-center">
                  <button type="submit" class="btn btn-primary" @click="uploadImg()">提交</button>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body" v-if="chooseRouter===2">
            <div class="tab-pane active" id="passwd">
              <form id="pw" action="password" method="post" class="form-horizontal">
                <div class="form-group">
                  <label class="control-label col-lg-3" for="password">当前密码</label>
                  <div class="col-lg-4">
                    <input type="password" class="form-control" name="oldPassword" maxlength="18" placeholder="请输入当前密码" data-required="">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-3" for="password">新密码</label>
                  <div class="col-lg-4">
                    <input type="password" class="form-control" id="password" name="password" placeholder="请输入新密码" maxlength="18" data-required="">
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label col-lg-3">确认密码</label>
                  <div class="col-lg-4">
                    <input type="password" class="form-control" name="password2" data-required="" placeholder="请再输入一遍新密码" maxlength="18" data-conditional="confirm" data-describedby="message" data-description="passwd">
                  </div>
                </div>
                <div class="form-group">
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary">提交</button>
                  </div>
                </div><!-- /form-actions -->
              </form>
            </div>
          </div>
        </div><!-- /panel -->
      </div>
    </div>
  </div>

</template>

<script>
  import auth from '../../../auth/index';
  import Head from '../../../components/header/Head.vue';
  import utils from '../../../utils';

export default {
  data () {
    return {
      chooseRouter: 0,
      activeList: [true, false, false],
      defaultImg: ''
    }
  },
  methods: {
    logout () {
      auth.logout();
    },
    goBaseInfo () {
      this.activeList.fill(false);
      this.activeList[0] = true;
      this.chooseRouter = 0
    },
    goModifyAvatar () {
      this.activeList.fill(false);
      this.activeList[1] = true;
      this.chooseRouter = 1
    },
    goModifyPwd () {
      this.activeList.fill(false);
      this.activeList[2] = true;
      this.chooseRouter = 2
    },
    changeAvatar () {
      const input = this.$refs.avatar;
      utils.resizeImgFile(input.files[0],
        result => {
          this.avatar = result
          input.value = null
        })
    },
    uploadImg () {
      this.$http.api({
        url: '/user/save-avatar',
        params: {
          avatar: this.avatar
        },
        successCallback: function (data) {
          console.log(data)
        }.bind(this)
      });
    }
  },
  computed: {
    avatar () {
      return this.$store.state.home.userInfo.userAvatar;
    }
  },
  components: {
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
  }

  .container-box {
    padding-top: 40px;
  }
  .update_ava {
    width: 240px;
    min-height: 240px;
    margin: 10px auto;
    text-align: center;
    background-color: #fafafa;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    img {
      vertical-align: middle;
      display: inline;
    }
  }
</style>
