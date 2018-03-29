<template>
  <div class="ss-header-box">
    <img src="./blog.png" class="blog-img">
    <div class="ss-header">
      <div v-for="(item,index) in headList" class="header-item">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headList: ['首页','关于我','文章','心情','相册','留言']
    }
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .ss-header-box {
    margin: 20px 50px;
    height: 50px;
    .blog-img {
      width:30%;
      height:150px;
      float: left;
      display: block;
    }

    .ss-header {
      width:600px;
      height:48px;
      border-radius: 30px;
      border:1px #808080;
      background-color: #9dc814 ;
      display: flex;
      justify-content: flex-start;
      float: right;
      font-weight: bolder;
      .header-item {
        width:100px;
        text-align: center;
        height:48px;
        line-height:48px;
      }
    }
  }


</style>
