<template>
  <div class="login v2">
    <div class="wrapper">
      <div class="dialog dialog-shadow" style="display: block; margin-top: -362px;">
        <div class="registered" v-if="registerStatus ===0">
          <h4 v-if="!registerCheckedFlag">注册账号</h4>
          <h4 v-else>设置密码</h4>
          <div class="content-1" style="margin-top: 20px;">
            <ul class="common-form">
              <li class="username border-1p">
                <div style="margin-top: 40px;" class="input">
                  <input v-if="!registerCheckedFlag&&!emailFlag" v-model="postPhone" type="text" placeholder="手机号" maxlength="11"
                         @blur="checkExist(0, postPhone)"
                         @keyup="postPhone=postPhone.replace(/[^\d]/g,'')">
                  <input v-if="emailFlag" v-model="email" type="text" placeholder="邮箱"  @blur="checkExist(1, email)">
                  <input v-if="registerCheckedFlag" type="password"
                         v-model="password"
                         maxlength="15"
                         placeholder="密码">
                </div>
              </li>
              <li v-if="captchaCheckedFlag">
                <div class="input">
                  <input type="password"
                         v-model="emailPassword"
                         maxlength="15"
                         placeholder="密码"
                  >
                </div>
              </li>
              <li v-if="!emailFlag">
                <div class="input" v-if="!registerCheckedFlag">
                  <input type="password"
                         v-model="captcha"
                         maxlength="6"
                         @keyup="captcha=captcha.replace(/[^\d]/g,'')"
                         placeholder="验证码" id="captcha">
                  <div class="captcha-boxed" @click="checkPhoneNum()" v-if="!clickFlag">发送验证码</div>
                  <div class="captcha-boxed" v-else>重新发送({{timeCount}})</div>
                </div>
                <div class="input" v-else>
                  <input type="password"
                         v-model="password2"
                         maxlength="15"
                         placeholder="重复密码">
                </div>
              </li>
            </ul>
            <div style="margin-bottom: 30px;">
              <y-button
                :classStyle="checkRegister()? 'main-btn':'disabled-btn'"
                :text="registxt"
                style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
                @btnClick="goRegister()"
                v-if="!registerCheckedFlag"
              >
              </y-button>
              <y-button
                :classStyle="checkSave? 'main-btn':'disabled-btn'"
                :text="registxt"
                style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
                @btnClick="goSave()"
                v-else
              >
              </y-button>
            </div>
            <div class="border" style="margin-bottom: 10px;" v-if="!registerCheckedFlag"></div>
            <ul class="common-form pr" v-if="!registerCheckedFlag">
              <li class="pa" style="left: 0;top: 0;margin: 0;color: #d44d44">{{errorTip}}</li>
              <li style="text-align: center;line-height: 48px;margin-bottom: 0;font-size: 12px;color: #999;">
                <span v-if="!emailFlag">没有收到验证码？您可以选择使用
                  <a href="javascript:;" style="margin: 0 5px" @click="changeEmail()">邮箱注册</a></span>
                <span v-else>使用
                   <a href="javascript:;" style="margin: 0 5px" @click="changeEmail()">手机注册</a></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="registered" v-else>
          <h4>设置昵称</h4>
          <div class="content-1" style="margin-top: 20px;">
            <ul class="common-form">
              <li class="username border-1p">
                <div style="margin-top: 40px;" class="input">
                  <input v-model="userName" type="text" placeholder="昵称">
                </div>
              </li>
            </ul>
            <div style="margin-bottom: 30px;">
              <y-button
                :classStyle="userName? 'main-btn':'disabled-btn'"
                text="保存"
                style="margin: 0;width: 100%;height: 48px;font-size: 18px;line-height: 48px"
                @btnClick="saveUserName()"
              >
              </y-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '../../components/tbutton/YButton'
  import checkPhone from '../../common/phone/check-phone'
  import checkEmail from '../../common/email/check-email'
  import Cookie from '../../utils/cookie'

  export default {
    data() {
      return {
        registxt: '注册',
        postPhone: '',
        password: '',
        password2: '',
        emailFlag: false,
        captcha: '',
        captchaCheckedFlag: false,
        clickFlag: false,
        timeCount: 60,
        callbackCaptcha: 'abc',
        callbackPhone: '',
        registerCheckedFlag: false,
        email: '',
        emailPassword: '',
        errorTip: '',
        errorCache: '',
        registerStatus: 0,
        userName: '',
        userId: ''
      }
    },
    methods: {
      changeEmail() {
        this.errorTip = ''
        this.email = ''
        this.emailPassword = ''
        if (!this.clickFlag) {
          this.postPhone = ''
        }
        this.captchaCheckedFlag = this.emailFlag = !this.emailFlag;
      },
      saveUserName () {
        if (this.userName && this.userName.length > 20) {
          return this.$store.commit('OPEN_ERROR_TIP', '昵称不能超过10个字符！')
        }
        this.$http.api({
          url: '/register/saveUserName',
          params: {userName: this.userName, userId: userId},
          successCallback: function (data) {
            if (data===1) {
              this.$store.commit('OPEN_ERROR_TIP', '保存成功！')
              let _this = this;
              setTimeout(function () {
                _this.$router.push('/')
              }, 1000)
            }
          }.bind(this)
        })
      },
      checkExist(type, val) {
        let trimVal = val.trim();
        if (trimVal && trimVal.length> 0) {
          this.$http.api({
            url: '/register/checkUserCode',
            params: {userCode: val},
            successCallback: function (data) {
              if (data===1) {
                this.errorTip = type===0? '该手机号已存在': '该邮箱已存在';
              } else this.errorTip = '';
            }.bind(this)
          })
        }
      },
      goSave (type = 0) {
        let params;
        if (type === 1){
          //邮箱注册
          params = {'emailCode': this.email, "emailPassword": this.emailPassword}
        }else {
          let postPhone = Cookie.getCookieValue('callback_phone');
          if (!postPhone) {
            this.$store.commit('OPEN_ERROR_TIP', '验证码已失效，请重新发送')
            return
          }
          params = {'postPhone': postPhone, "password": this.password}
        }
        this.saveRegisterInfo(type, params)
      },
      saveRegisterInfo (type, params) {
        this.$http.api({
          url: '/register/saveUserInfo',
          params,
          emulateJSON: false,
          successCallback: function (data) {
            if (type === 1) {
              this.$store.commit('OPEN_ERROR_TIP', '注册成功，请前往邮箱激活账号')
            }
            this.registerStatus = 1;
            this.userId = data;
          }.bind(this),
          errorCallback: function (error) {
            this.$store.commit('OPEN_ERROR_TIP', error.data.message);
          }.bind(this)
        })
      },
      goRegister() {
        if (this.emailFlag) {
          this.goSave(1);
          return
        }
        this.registerCheckedFlag = true
        this.registxt = '保存'
      },
      prefixInteger(num, n) {
        if (num < 10) {
          return (Array(n).join(0) + num).slice(-n);
        } else {
          return num;
        }
      },
      initInterval() {
        let _this = this
        this.timeInterval = setInterval(function () {
          if (_this.timeCount > 0) {
            _this.prefixInteger(--_this.timeCount, 2)
          } else {
            _this.clickFlag = false;
            clearInterval(_this.timeInterval)
          }
        }, 1000);
      },
      checkPhoneNum() {
        let postPhone = this.postPhone;
        if (this.errorTip) {
          return
        }
        if (!checkPhone(postPhone)) {
          this.$store.commit('OPEN_ERROR_TIP', '请输入正确格式的手机号')
          return
        }
        this.clickFlag = true;
        this.initInterval();
        this.$http.api({
          url: '/register/init-captcha',
          params: {'phoneNum': postPhone},
          successCallback: function (data) {
            this.callbackCaptcha = data[0].captcha;
            this.callbackPhone = data[0].phone;
            Cookie.setCookie('callback_captcha', this.callbackCaptcha, 15 * 60 * 1000);
            Cookie.setCookie('callback_phone', this.callbackPhone, 15 * 60 * 1000);
          }.bind(this)
        })
      },
      checkRegister() {
        if (this.emailFlag) {
          return checkEmail(this.email) && !this.errorTip && this.emailPassword;
        }
        if (this.postPhone != this.callbackPhone || this.callbackCaptcha != this.captcha) {
          return false;
        }
        return true;
      }
    },
    computed: {
      checkSave () {
        return this.password && this.password === this.password2
      }
    },
    created() {
      let captcha_timer = Cookie.getCookieValue('captcha_timer');
      let callback_captcha = Cookie.getCookieValue('callback_captcha');
      let callback_phone = Cookie.getCookieValue('callback_phone');
      if (captcha_timer) {
        this.clickFlag = true
        this.timeCount = captcha_timer
        this.initInterval()
      }
      callback_captcha? this.callbackCaptcha = callback_captcha: '';
      callback_phone? this.callbackPhone = callback_phone: '';
    },
    components: {
      YButton
    },
    watch: {
      timeCount(val) {
        if (val > 0) {
          Cookie.setCookie('captcha_timer', val, (val + 1)* 1000);
        }else Cookie.delCookie('captcha_timer')
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  * {
    box-sizing: content-box;
  }

  .login {
    overflow-x: hidden;
    overflow-y: hidden;
    .input {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        font-size: 16px;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 6px;
      }
    }
    .wrapper {
      background: url(../../assets/images/bg_9b9dcb65ff.png) repeat;
      background-size: 100px;
      min-height: 800px;
      min-width: 630px;
    }
  }

  .v2 .dialog {
    width: 450px;
    border: 1px solid #dadada;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    margin-left: -225px;
    position: absolute;
    .title {
      background: linear-gradient(#fff, #f5f5f5);
      height: auto;
      overflow: visible;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
      position: relative;
      background-image: url(../../assets/images/smartisan_4ada7fecea.png);
      background-size: 140px;
      background-position: top center;
      background-repeat: no-repeat;
      height: 92px;
      margin: 23px 0 50px;
      padding: 75px 0 0;
      box-shadow: none;
      h4 {
        padding: 0;
        text-align: center;
        color: #666;
        border-bottom: 1px solid #dcdcdc;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        font-weight: 700;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        margin: 0;
        padding: 0;
        border-bottom: 0;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        line-height: 1em;
        height: auto;
        color: #333;
        font-weight: 400;
      }
    }
    .content-1 {
      padding: 0 40px 22px;
      height: auto;
      .common-form {
        li {
          clear: both;
          margin-bottom: 15px;
          position: relative;
        }
      }
    }
  }

  .dialog-shadow,
  .v2 .bbs .dialog-shadow,
  .v2 .dialog-shadow {
    -webkit-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    -moz-box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
    box-shadow: 0 9px 30px -6px rgba(0, 0, 0, 0.2),
    0 18px 20px -10px rgba(0, 0, 0, 0.04), 0 18px 20px -10px rgba(0, 0, 0, 0.04),
    0 10px 20px -10px rgba(0, 0, 0, 0.04);
  }

  @media screen and (min-width: 737px),
  screen and (-webkit-max-device-pixel-ratio: 1.9) and (max-width: 736px) and (min-device-width: 737px) {
    .wrapper {
      background: url(../../assets/images/con-bg_04f25dbf8e.jpg) repeat-x;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    .dialog {
      background: url(../../assets/images/dialog-gray-bg.png) #fff bottom repeat-x;
      border-radius: 12px;
      display: none;
      margin: -163px 0 0 -218px;
      width: 436px;
      position: fixed;
      left: 50%;
      top: 50%;
    }
    .dialog .title h4 {
      border-bottom: #d1d1d1 solid 1px;
      box-shadow: 0 2px 6px #d1d1d1;
      color: #666;
      font-size: 20px;
      height: 61px;
      line-height: 61px;
      padding: 0 0 0 35px;
    }
    .common-form li {
      clear: both;
      margin-bottom: 15px;
      position: relative;
    }
    .auto-login {
      position: absolute;
      top: 0px;
      left: 2px;
      color: #999;
    }
    .register {
      padding: 1px 10px 0;
      border-right: 1px solid #ccc;
    }
    .border {
      margin-top: 10px;
      border-bottom: 1px solid #ccc;
    }
    .other {
      margin: 20px 5px 0 0;
      width: auto;
      font-size: 12px;
      cursor: default;
      color: #999;
    }
    .footer {
      display: flex;
      flex-direction: row;
    }
    .agree {
      margin-bottom: 30px;
      color: #999;
    }
  }

  .registered {
    h4 {
      padding: 0;
      text-align: center;
      color: #666;
      border-bottom: 1px solid #dcdcdc;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      font-weight: 700;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
    }
  }

  #wait {
    text-align: left;
    color: #999;
    margin: 0;
  }

  #captcha {
    width: 150px;
  }

  .captcha-boxed {
    width: 180px;
    text-align: center;
    height: 100%;
    line-height: 50px;
    border-radius: 5px;
    background-color: #808080;
    color: #fff;
  }
</style>
