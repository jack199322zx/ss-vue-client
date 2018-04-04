<template>
  <div>
    <Header :headList="headList" :images="imgPath"></Header>
    <Article :swipeList="swipeList"
             :images="imgPath"
             :titleList="titleList"
             :blogs="blogList"
             :clickRankList="clickRankList"
             :newsList="newsList"
             :recommend = "authorRecommend"></Article>
    <footer>
      <p class="ft-copyright">兔小白博客 Design by DanceSmile 蜀ICP备11002373号-1</p>
      <div id="tbox"><a id="togbook" href="/"></a> <a id="gotop" href="javascript:void(0)"></a></div>
    </footer>
  </div>
</template>

<script>
  import blog from '../../common/img/imgPath';
  import Header from '../../components/header/Head.vue';
  import Article from '../../components/article/Article.vue';

  export default {
    data() {
      return {
        imgPath: blog,
        slider: {
          data: []
        },
        swipeList: [{path: blog.a1}, {path: blog.a2}, {path: blog.a3}, {path:blog.a4}],
        headList: ['首页','关于我','技术杂谈','小助手','相册','留言板'],
        titleList: ['个人博客','生活驿站','轻松时刻'],
        blogList: [{
          title:'住在手机里的朋友',
          blogImg:blog.b1,
          blogDesc:'通信时代，无论是初次相见还是老友重逢，交换联系方式，常常是彼此交换名片，然后郑重或是出于礼貌用手机记下对方的电话号码。在快节奏的生活里，我们不知不觉中就成为住在别人手机里的朋友。又因某些意外，变成了别人手机里匆忙的过客，这种快餐式的友谊 ...',
          blogType:'个人博客',
          time:'2014-02-19',
          viewNum: 450,
          comments: 59,
          link: ''
        },{
          title:'教你怎样用欠费手机拨打电话',
          blogImg:blog.b2,
          blogDesc:'初次相识的喜悦，让你觉得似乎找到了知音。于是，对于投缘的人，开始了较频繁的交往。渐渐地，初识的喜悦退尽，接下来就是仅仅保持着联系，平淡到偶尔在节假曰发短信互致问候...',
          blogType:'轻松时刻',
          time:'2014-02-19',
          viewNum: 430,
          comments: 55,
          link: ''
        },{
          title:'原来以为，一个人的勇敢是，删掉他的手机号码...',
          blogImg:blog.b3,
          blogDesc:'原来以为，一个人的勇敢是，删掉他的手机号码、QQ号码等等一切，努力和他保持距离。等着有一天，习惯不想念他，习惯他不在身边,习惯时间把他在我记忆里的身影磨蚀干净... ',
          blogType:'个人博客',
          time:'2014-02-19',
          viewNum: 460,
          comments: 62,
          link: ''
        },{
          title:'手机的16个惊人小秘密，据说99.999%的人都不知',
          blogImg:blog.b4,
          blogDesc:'引导语：知道么，手机有备用电池，手机拨号码12593+电话号码=陷阱……手机具有很多你不知道的小秘密，说出来一定很惊奇！不信的话就来看看吧！...',
          blogType:'轻松时刻',
          time:'2014-02-19',
          viewNum: 450,
          comments: 59
        },{
          title:'你面对的是生活而不是手机',
          blogImg:blog.b5,
          blogDesc:'每一次与别人吃饭，总会有人会拿出手机。以为他们在打电话或者有紧急的短信，但用余光瞟了一眼之后发现无非就两件事：1、看小说，2、上人人或者QQ...',
          blogType:'生活驿站',
          time:'2014-02-19',
          viewNum: 450,
          comments: 59,
          link: ''
        },{
          title:'豪雅手机正式发布! 在法国全手工打造的奢侈品',
          blogImg:blog.b6,
          blogDesc:'现在跨界联姻，时尚、汽车以及运动品牌联合手机制造商联合发布手机产品在行业里已经不再新鲜，上周我们给大家报道过著名手表制造商瑞士泰格·豪雅（Tag Heuer） 联合法国的手机制造商Modelabs发布的一款奢华手机的部分谍照，而近日该手机终于被正式发布了...',
          blogType:'个人博客',
          time:'2014-02-19',
          viewNum: 450,
          comments: 59,
          link: ''
        }],
        clickRankList:[{
          title: '住在手机里的朋友',
          link: ''
        },{
          title: '教你怎样用欠费手机拨打电话',
          link: ''
        },{
          title: '原来以为，一个人的勇敢是，删掉他的手机号码...',
          link: ''
        },{
          title: '手机的16个惊人小秘密，据说99.999%的人都不知',
          link: ''
        },{
          title: '你面对的是生活而不是手机',
          link: ''
        },{
          title: '豪雅手机正式发布! 在法国全手工打造的奢侈品',
          link: ''
        }],
        newsList:[{
          title: '原来以为，一个人的勇敢是，删掉他的手机号码...',
          link: ''
        },{
          title: '手机的16个惊人小秘密，据说99.999%的人都不知',
          link: ''
        },{
          title: '住在手机里的朋友',
          link: ''
        },{
          title: '教你怎样用欠费手机拨打电话',
          link: ''
        },{
          title: '你面对的是生活而不是手机',
          link: ''
        },{
          title: '豪雅手机正式发布! 在法国全手工打造的奢侈品',
          link: ''
        }],
        authorRecommend:[{
          title: '原来以为，一个人的勇敢是，删掉他的手机号码...',
          link: ''
        },{
          title: '手机的16个惊人小秘密，据说99.999%的人都不知',
          link: ''
        },{
          title: '住在手机里的朋友',
          link: ''
        },{
          title: '教你怎样用欠费手机拨打电话',
          link: ''
        },{
          title: '你面对的是生活而不是手机',
          link: ''
        },{
          title: '豪雅手机正式发布! 在法国全手工打造的奢侈品',
          link: ''
        }],
        authorRecommend: [{
          title: '教你怎样用欠费手机拨打电话',
          link: ''
        },{
          title: '手机的16个惊人小秘密，据说99.999%的人都不知',
          link: ''
        },{
          title: '豪雅手机正式发布! 在法国全手工打造的奢侈品',
          link: ''
        },{
          title: '原来以为，一个人的勇敢是，删掉他的手机号码...',
          link: ''
        },{
          title: '你面对的是生活而不是手机',
          link: ''
        },{
          title: '住在手机里的朋友',
          link: ''
        }]
      }
    },
    methods: {

    },
    created() {
    },
    components: {
      Header,
      Article
    }
  }
</script>

<style scoped lang="less" rel="stylesheet/less">
  #slide-img-1 {
    width:100%;
    height:100%;
  }
</style>
