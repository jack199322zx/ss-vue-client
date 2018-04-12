<template>
  <div class="portal-bg" ref="body">
    <div class="top-box"></div>
    <div class="af-col-12 login-input-wrapper">
      <div id="login-input" class="animated flipInY">
        <div>
          <input id="staff-account" type="text" placeholder="用户名" v-model="userName">
        </div>
        <div style="color:#fff">
          <input id="staff-password" type="password" placeholder="密码" v-model="password"/>
        </div>
        <div style="margin-top:12px">
          <div id="captcha1" style="width:260px;">
            <p id="wait1" class="show" v-show="captchaShow">正在加载验证码......</p>
          </div>
        </div>
        <p id="notice1" class="hide" v-show="noticeShow">请先完成验证</p>
        <div class="register-button" @click="goRegister()">新用户注册</div>
        <div>
          <input type="button" value="登录" @click="submit" @keyup.enter="submit"/>
        </div>
        <div>
          <span id="login-error">
          <router-link tag="label" to="/login/forget-pwd" style="cursor: pointer;">忘记密码?</router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@/assets/styles/animate.css'
  import auth from '../../auth'
  import {OPEN_OPERATE_DIALOG_BOX} from '../../store/mutation-types.js'

  var captcha;
  export default {
    data() {
      return {
        userName: '',
        password: '',
        noticeShow: false,
        captchaShow: false,
        captchaParams: Object,
        successFlag: false
      }
    },
    methods: {
      submit () {
        if (!this.successFlag) {
          console.log(this.$store.state)
          this.$store.commit(OPEN_OPERATE_DIALOG_BOX, {
            'text': '请先完成验证'
          });
//          alert('请先完成验证')
          captcha.reset();
          return
        }
        if (this.userName && this.password) {
          this.submitForm()
        }else {
          this.$store.commit(OPEN_OPERATE_DIALOG_BOX, {
            'text': '用户名或密码不能为空'
          });
          captcha.reset();
        }

      },
      goRegister () {
        this.$router.push('/register');
      },
      submitForm() {
        console.log('=========提交表单校验==========');
        let params = Object.assign(this.captchaParams, {userName: this.userName, password: this.password})
        this.$http.api({
          url: '/gt/check',
          params,
          successCallback: function (data) {
            // 根据服务端二次验证的结果进行跳转等操作
            if (data === 'failed') {
              this.$store.commit(OPEN_OPERATE_DIALOG_BOX, {
                'text': '验证失败！请重试'
              });
              captcha.reset(); // 调用该接口进行重置
              return
            }
            auth.save(data)
            location.href = location.href.replace(/(#\/).*/g, '$1blog');
//            this.$router.push('/blog')

          }.bind(this),
          errorCallback: function (response) {
            this.$store.commit(OPEN_OPERATE_DIALOG_BOX, {
              'text': response.data.message
            });
          }.bind(this)
        });

      }
    },
    components: {},
    mounted: function () {
      this.$refs.body.style.height = window.innerHeight + 'px';
      window.addEventListener('keyup', this.enterListener);
    },

    destroyed: function () {
      window.removeEventListener('keyup', this.enterListener);
    },
    created: function () {
      this.$http.api({
        url: '/gt/init?t=' + (new Date()).getTime(),// 加随机数防止缓存
        method: 'GET',
        successCallback: function (data) {
          let _this = this
          let json = JSON.parse(data)
          console.log(json);
          // 调用 initGeetest 初始化参数
          // 参数1：配置参数
          // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
          window.initGeetest({
            gt: json.gt,
            challenge: json.challenge,
            new_captcha: json.new_captcha, // 用于宕机时表示是新验证码的宕机
            offline: !json.success, // 表示用户后台检测极验服务器是否宕机，一般不需要关注
            product: "float", // 产品形式，包括：float，popup
            width: "100%"
          }, function (captchaObj) {
            console.log(captchaObj)
            captcha = captchaObj;
            // 将验证码加到id为captcha的元素里，同时会有三个input的值用于表单提交
            captchaObj.appendTo("#captcha1");
            let __this = _this;
            captchaObj.onReady(function () {
              __this.captchaShow = false
            });
            captchaObj.onSuccess(() => {
              console.log("======验证成功========")
              let result = captchaObj.getValidate();
              let params = {
                geetest_challenge: result.geetest_challenge,
                geetest_validate: result.geetest_validate,
                geetest_seccode: result.geetest_seccode,
              }
              _this.captchaParams = params
              _this.successFlag = true
            });
          });
        }.bind(this)
      });
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  @import '../../assets/less/base';

  .portal-bg {
    background: url(index.jpg) no-repeat 100% 100% / cover;
    .top-box {
      height: 30%;
    }
  }

  .inp {
    border: 1px solid #cccccc;
    border-radius: 2px;
    padding: 0 10px;
    width: 278px;
    height: 40px;
    font-size: 18px;
  }

  .btn {
    border: 1px solid #cccccc;
    border-radius: 2px;
    width: 100px;
    height: 40px;
    font-size: 16px;
    color: #666;
    cursor: pointer;
    background: white linear-gradient(180deg, #ffffff 0%, #f3f3f3 100%);
  }

  .btn:hover {
    background: white linear-gradient(0deg, #ffffff 0%, #f3f3f3 100%)
  }

  #captcha1,
  #captcha2 {
    width: 300px;
    display: inline-block;
  }

  .show {
    display: block;
  }

  .hide {
    display: none;
  }

  #notice1,
  #notice2 {
    color: red;
  }

  label {
    vertical-align: top;
    display: inline-block;
    width: 80px;
    text-align: right;
  }

  #wait1, #wait2 {
    text-align: left;
    color: #666;
    margin: 0;
  }

  .login-wrapper {
    height: 560px;
    font-size: 16px;
    padding: 0 3% 0 10%;
    background-color: #daf3fa;
  }

  .login-wrapper .login-logo-wrapper {
    margin-top: 80px;
    height: 420px;
    line-height: 420px;
  }

  #login-logo {
    height: 100%;
    vertical-align: middle;
  }

  .login-wrapper .login-input-wrapper {
    margin-top: 110px;
    width: 300px;
    margin-left: 80px;
    background-color: #fff;
    text-align: center;
  }

  #login-input {
    text-align: center;
  }

  #login-input-title {
    font-size: 18px;
    color: @blue-color;
  }

  #login-input input {
    width: 170px;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    outline: none;
    font-size: 16px;
    border: 1px solid #ccc;
  }

  #staff-account, #staff-password, #captcha {
    padding: 0 44px;
    background-size: 20px 20px;
    background: no-repeat 12px center;
    color: #fff;
  }

  #staff-account {
    margin-top: 20px;
    background-image: url(./icon-user.png);
  }

  #staff-password {
    margin-top: 12px;
    background-image: url(./icon-passwd.png);
  }

  .captcha-box {
    margin-top: 12px;
    #captcha {
      width: 91px !important;
      background-image: url(./icon-captcha.png);
    }
    .vCode {
      height: 36px;
      width: 82px;
      margin: 0 5px 0 5px;
      cursor: pointer;
    }
    .icon-shuaxin {
      color: #06addd;
      cursor: pointer;
    }
  }

  #login-error {
    width: 260px;
    margin-top: 20px;
    display: inline-block;
  }

  #login-error label:first-child {
    color: #dd3e06;
    float: right;
  }


  #login-input input[type=button] {
    width: 260px;
    font-size: 18px;
    color: #fff;
    border: none;
    margin-top: 16px;
    cursor: pointer;
    background-color: @blue-color;
  }

  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: @gray-color;
    opacity: 1;
  }

  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: @gray-color;
    opacity: 1;
  }

  input:-ms-input-placeholder {
    color: @gray-color;
    opacity: 1;
  }

  input::-webkit-input-placeholder {
    color: @gray-color;
    opacity: 1;
  }
  .register-button {
    display: block;
    width: 260px;
    font-size: 18px;
    color: #fff;
    border: none;
    margin:0 auto;
    margin-top: 16px;
    cursor: pointer;
    height: 40px;
    text-align: center;
    line-height: 40px;
    border-radius: 40px;
    background-color: @gray-color;
  }
</style>
