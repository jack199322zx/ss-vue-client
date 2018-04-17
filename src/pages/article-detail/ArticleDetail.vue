<template>
  <div class="wrap">
    <div class="container container-box">
      <div class="row main">
        <div class="col-xs-12 col-md-9 side-left topics-show">
          <!-- view show -->
          <div class="topic panel panel-default">
            <div class="infos panel-heading">

              <h1 class="panel-title topic-title">啊啊啊啊啊啊</h1>

              <div class="meta inline-block">

                <a class="author" href="/users/2">
                  sweeettttt
                </a>
                <abbr class="timeago">35秒前</abbr>
                ⋅
                1 阅读

              </div>
              <div class="clearfix"></div>
            </div>

            <div class="content-body entry-content panel-body ">
              <div class="markdown-body">
                <p>呵呵哒</p><br>注意：本文归作者所有，未经作者允许，不得转载
              </div>
            </div>
            <div class="panel-footer operate">
                    <span>
                            <a class="label label-default" href="/tag/垃圾/">#垃圾</a>
                        </span>
            </div>
            <div class="panel-footer operate">
              <div class="entry-footer wp">
                <div class="tip-box">
                  <div class="tip-button">
                    赞赏
                    <div class="tip-popover">
                      <div class="tip-alipay"><img
                        src="https://qq52o.me/wp-content/themes/c7v5/img/tip_qrcode_alipay.jpg"
                        alt="alipay"><span>支付宝赞赏</span></div>
                      <div class="tip-wechatpay"><img
                        src="https://qq52o.me/wp-content/themes/c7v5/img/tip_qrcode_wechatpay.jpg" alt="wechat"><span>微信赞赏</span>
                      </div>
                    </div>
                  </div>
                  <p class="tip-desc">如果文章对您有帮助，欢迎给作者打赏</p>
                </div>
                <div class="social-sharer">
                  <a class="socialshare icon-weibo" href="" target="_blank"></a>
                  <a class="socialshare icon-wechat" href="javascript:;">
                    <div class="qrcode-box"><h4>分享到微信</h4><img src="">
                    <p>用微信「扫一扫」上方二维码即可。</p>
                    </div>
                  </a>
                  <a class="socialshare icon-qzone" href="" target="_blank"></a>
                  <a class="socialshare icon-qq" href="" target="_blank"></a>
                  <a class="socialshare icon-douban" target="_blank"></a>
                  <a class="socialshare icon-yingxiang" target="_blank"></a>
                </div>
                <div class="social-share" data-disabled="google" data-description="Share.js - 一键分享到微博，QQ空间，腾讯微博，人人，豆瓣"></div>
              </div>
            </div>
          </div>

          <!-- Comments -->
          <div id="chat" class="chats shadow-box">
            <div class="chat_other">
              <h4>全部评论: <i id="chat_count">0</i> 条</h4>
            </div>
            <ul id="chat_container" class="its"></ul>
            <div id="pager" class="text-center"></div>
            <div class="cbox-wrap">
              <div class="cbox-title">我有话说: <span id="chat_reply" style="display:none;">@<i id="chat_to"></i></span>
              </div>
              <div class="cbox-post">
                <div class="cbox-input">
                  <textarea id="chat_text" rows="3" placeholder="请输入评论内容"></textarea>
                  <input type="hidden" value="0" name="chat_pid" id="chat_pid">
                </div>
                <div class="cbox-ats clearfix">
                  <div class="ats-func">
                    <ul class="func-list">
                      <li class="list-b">
                        <a href="javascript:void(0);" class="join" id="c-btn"><i class="fa fa-smile-o fa-2"></i></a>
                      </li>
                    </ul>
                  </div>
                  <div class="ats-issue">
                    <button id="btn-chat" class="btn btn-success btn-sm bt">发送</button>
                  </div>
                </div>
              </div>
              <div class="phiz-box" id="c-phiz" style="display:none">
                <div class="phiz-list" view="c-phizs"></div>
              </div>
            </div>
          </div>
          <!-- /view show -->
        </div>
        <div class="col-xs-12 col-md-3 side-right hidden-xs hidden-sm">
          <ul class="list-group about-user">
            <li class="list-group-item user-card">
              <div class="ava">
                <a href="/users/2">
                  <img class="img-circle" src="/dist/images/ava/default.png">
                </a>
              </div>
              <div class="user-info">
                <div class="nk mb10">sweeettttt</div>
                <div class="mb6">
                  <a class="btn btn-default btn-xs" href="javascript:void(0);" data-id="2" rel="follow"><i
                    class="icon icon-user-follow"></i> 关注</a>
                </div>
              </div>
            </li>

            <li class="list-group-item">
              <div class="user-datas">
                <ul>
                  <li><strong>1</strong><span>发布</span></li>
                  <li class="noborder"><strong>0</strong><span>评论</span></li>
                </ul>
              </div>
            </li>
            <li class="list-group-item">
              <div class="text-center padding-md">
                <a class="btn btn-default btn-sm" href="javascript:void(0);" data-id="1" rel="favor">
                  <i class="icon icon-like"></i> 喜欢
                </a>
                <strong id="favors">0</strong> 喜欢
              </div>
            </li>
          </ul>
          <div class="panel panel-default corner-radius panel-hot-topics">
            <div class="panel-heading text-center">
              <h3 class="panel-title"><i class="fa fa-area-chart"></i> 热门文章</h3>
            </div>
            <div class="panel-body">
              <ul class="list" id="hots">
                <li>1. <a href="/view/1">啊啊啊啊啊啊</a></li>
              </ul>
            </div>
          </div>

          <div class="panel panel-default corner-radius panel-hot-topics">
            <div class="panel-heading text-center">
              <h3 class="panel-title"><i class="fa fa-bars"></i> 最新发布</h3>
            </div>
            <div class="panel-body">
              <ul class="list" id="latests">
                <li>1. <a href="/view/1">啊啊啊啊啊啊</a></li>
              </ul>
            </div>
          </div>

          <div class="panel panel-default corner-radius panel-hot-topics">
            <div class="panel-heading text-center">
              <h3 class="panel-title"><i class="fa fa-users "></i> 热门用户</h3>
            </div>
            <div class="panel-body remove-padding-horizontal">
              <ul class="hotusers" id="hotuser">
                <li><a href="/users/2"><img src="/dist/images/ava/default.png" class="avatar avatar-small"></a></li>
                <li><a href="/users/1"><img src="/dist/images/ava/default.png" class="avatar avatar-small"></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      console.log(this.toQuery);
    },
    computed: {
      toQuery() {
        return this.$store.state.home.componentInfo.data;
      }
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

  .panel-heading {
    background-color: #fff;
  }
  .entry-footer {
    margin-bottom: 40px;
  }
  .wp {
    width: 700px;
    margin-right: auto;
    margin-left: auto;
    clear: both;
  }
  .tip-box {
    margin: 2em 0;
    clear: both;
    text-align: center;
  }
  .tip-button {
    position: relative;
    display: inline-block;
    padding: 0 1.5em;
    margin: 0 auto 10px;
    font-size: 18px;
    font-weight: 700;
    line-height: 44px;
    color: #fff;
    cursor: pointer;
    background: #f36;
    border-radius: 22px;
  }
  .tip-popover {
    position: absolute;
    bottom: 100%;
    left: -115px;
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1em;
    color: #333;
    text-align: center;
    cursor: default;
    visibility: hidden;
    background: #fff;
    border-radius: 3px;
    box-shadow: 0 10px 50px rgba(0,0,0,.5);
    opacity: 0;
    -webkit-transition: .3s;
    transition: .3s;
    -webkit-transform: scale(.5);
    -ms-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 50% 100%;
    -ms-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
  }
  .tip-popover div {
    float: left;
    width: 50%;
  }
  .tip-popover img {
    width: 130px;
    margin: 10px;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border-style: none;
  }
  .tip-popover span {
    display: block;
    margin-bottom: 10px;
  }
  .tip-desc {
    color: #777;
  }

</style>
