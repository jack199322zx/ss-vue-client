<template>
  <div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkCode: this.$route.query.checkCode,
      userId: this.$route.query.userId,
      backTime: 3,
      backTimeInterval: ''
    }
  },
  mounted () {
    let params = {checkCode: this.checkCode, userId: this.userId};
    this.$http.api({
      url: '/register/activate',
      params,
      successCallback: function (data) {
        if (data === 'success') {
          this.$store.commit('OPEN_OPERATE_DIALOG_BOX', {
            text: '恭喜您激活成功！',
            sureCallback: function () {
              this.$router.push('/')
            }.bind(this),
            cancelCallback: function () {
              this.$router.push('/')
            }.bind(this)
          });
        }else {
          _this.$store.commit('OPEN_OPERATE_DIALOG_BOX', {
            text: '激活失败，请重试！',
            sureCallback: function () {
              this.$router.push('/register')
            }.bind(this),
            cancelCallback: function () {
              this.$router.push('/register')
            }.bind(this)
          });
        }
      }.bind(this),
      errorCallback: function (error) {
        this.$store.commit('OPEN_OPERATE_DIALOG_BOX', {
          text: '该用户已激活！',
          sureCallback: function () {
            this.$router.push('/')
          }.bind(this),
          cancelCallback: function () {
            this.$router.push('/')
          }.bind(this)
        });
      }.bind(this)
    })
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">

</style>
