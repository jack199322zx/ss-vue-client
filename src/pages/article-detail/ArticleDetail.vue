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
              <div class="hidden-xs">
                <div class="social-share share-component"
                     data-sites="weibo, wechat, facebook, twitter, google, qzone, qq">
                  <a class="social-share-icon icon-weibo"
                     href="http://service.weibo.com/share/share.php?url=http%3A%2F%2Flocalhost%3A8080%2Fview%2F1&amp;title=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%20-%20Mtons&amp;pic=http%3A%2F%2Flocalhost%3A8080%2Fstatic%2Fdefault%2Fimages%2Flogo.png&amp;appkey="
                     target="_blank"></a><a class="social-share-icon icon-wechat" href="javascript:">
                  <div class="wechat-qrcode"><h4>微信扫一扫：分享</h4>
                    <div class="qrcode" title="http://localhost:8080/view/1">
                      <canvas width="100" height="100" style="display: none;"></canvas>
                      <img alt="Scan me!"
                           src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFn0lEQVR4Xu2d4ZKCMAyE9f0f2hsFZ5CS8i1JBW/2fse0zWY3SUHvfrvdHrfiv8dj3+X9ft9cdflZ1YZ8lhw18lPlv7eHZ1T2o0dOsbAxIGLAFuYGZCN2l2EIyewI+6W8EGpnDq36X+6ZyGBkT/ascmO9nw+GGJA2nCTRquL2XN2AzBhEQb0MIBG1lzlEKEwkomotIqeRjZrlBCiyFpasqiAZkBaWXg0MJcuA9Mvzv2NIlfSpskA6tNE+L8kQAzJF4DI1xIBcDJBMh0bAJDak1VX9ZGpvdw7JOCY6bUDMkEazf4ohmTsZwhAiBeoeVNaRYZC0t8QPHVpPuzoxIKJkqdlJMknt79U9/DuGqAFQA5wJGAH8LP9VcWu6rCrHZwXmrHWr4mZAFs/+MwwsBeSRaREqdzL7IoGJGgLaybztCKMGHLHr8m5A2m7nzBw1IDvMvAxDIulYbpBcr5BOjEgNyVp1z+qkPnp2ehX1SLLUw6mZVBXgKEFIsIkNSajKxDQgGxEnAVavhwiw3baXZA+xyTBHZanKum9I0HsN2j2Gby6SYBMbA9Lv4rpPDEl/r2atAREBqZpDKCX3hjJVRoiWqwMgeXUp0212X3IwIC2HDciA74oQpqk1ULUnnRV+60TVfnUeIMOgugciX0eCtCWzmfP22uqyJ4aZDWb0mDCBAEvAJAzJtN7NHEKckcORTswM2Y5A6nLxm8VPZRFJLtIZElYQGSSJ/GJIpssyIP0wk6RYezAgc0SqZhUyXPdgLPs6AqkJasYQBqo2JPCqTypHZCg2IDsMqeriqB8DcjVAlkVd7TrU5wakUyJdDbEhMkL8kPkkUzeaSd2AtNCRxKxqdQ3IIpKXZEj0WydqR6R2Weo0T+xJZhMQ1OwnXRmR0ObqJKOFBqSNwJGklh/hUqTfdpmsjZoAkuVk3iBNBknSUoaQqxNVLlTQ1EOrgKjAVgF1JA7o6sSA9EN7RJpCiTdD+sHOzFqHGEJ+UY4MR78iIyrbM+ciUolfA6J3L2+7zMZJkKp0naxVZWNAEkMfCZ5qQ+zxSw5qlhBGqdKn6jexJ0Nfxs+RuvEB3LKGVPXuxA/p3UlgCMgkSFV+yFo9G3T9TuqDGZKFYvo8mtTVTCVbUyf4KgkdsTfScFAGGpANhNRkMSDBT5mTuvRTDMlcAYzIqhEdEamHVF629qfGELe9JJPUPpsEg6w7ImAkodS9EXsDAuRuBOARON1HuCMyPsMKdZ4h9iQwBJCqtdb7kb+Fq7afBqRNgd4YYUDmeKk1ZBhDyEsOpJ0kw6M6zasSSroy4pPMFVVnaSTLgEwhGS2tFOTUpE6KH8naTF0izCTBJjYjzlJa1CPakk6GUF4NANmPWiuIT3JeCniqqKubrapFhJkkAMSPesZsjTIgG10WYWZkkwYk85IDyTByt0OYo8pCprbQAkxAedvQNhn92zzirCqoqkSMrgkEWAIMieHTjwHZiebXASEvypEMqJIUVQarGEICr8qvav9iiAGZUsmADPjBGcKuqvlHVQRij2uIKllqYDJBIk0AyX6yB1KYyVq9+KCibkCmCBiQQNbUwY1k7SUZQroCooVEsshamUtHldUEtKo99/ZW9ntZavtZdTgCGgHHgAQvG0TXFuplIQEhWkuVRHXPhxiiZoyaqar/jFQSMFUAiT1RgbUf9LI1yRgD0kbJgID/mKPKFGECSVjq56sMUQs/OSjxSbo+EjBV+oj92saAECRmGxJg9ebAgIjDphpg1f7rgJBuKnMIIlmEBEcK8Jbf7H6GS5YBmWCjcTAgO/WBsIsMhmlAqjaSGehGSFnVudS5i647/C7LgFAoZmmLvqeuufnUSFIg1eJHWk7yvKLqXF9hiLpZMripDCF6TPZJNJsAmPFD4rP2P/yJoQFpI3DqI1wDYkBw339FyfoDcmv3LuO0WkgAAAAASUVORK5CYII="
                           style="display: block;"></div>
                    <div class="help"><p>微信里点“发现”，扫一下</p>
                      <p>二维码便可将本文分享至朋友圈。</p></div>
                  </div>
                </a><a class="social-share-icon icon-facebook"
                       href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A8080%2Fview%2F1"
                       target="_blank"></a><a class="social-share-icon icon-twitter"
                                              href="https://twitter.com/intent/tweet?text=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%20-%20Mtons&amp;url=http%3A%2F%2Flocalhost%3A8080%2Fview%2F1&amp;via=http%3A%2F%2Flocalhost%3A8080"
                                              target="_blank"></a><a class="social-share-icon icon-google"
                                                                     href="https://plus.google.com/share?url=http%3A%2F%2Flocalhost%3A8080%2Fview%2F1"
                                                                     target="_blank"></a><a
                  class="social-share-icon icon-qzone"
                  href="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=http%3A%2F%2Flocalhost%3A8080%2Fview%2F1&amp;title=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%20-%20Mtons&amp;desc=Mtons%2C%20%E8%BD%BB%E6%9D%BE%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E5%85%B4%E8%B6%A3.%20%E4%BE%BF%E6%8D%B7%E7%9A%84%E6%96%87%E5%AD%97%E3%80%81%E5%9B%BE%E7%89%87%E5%8F%91%E5%B8%83%2C%E6%89%81%E5%B9%B3%E5%8C%96%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E8%AE%BE%E8%AE%A1%2C%E7%BE%8E%E8%A7%82%E3%80%81%E5%A4%A7%E6%B0%94%2C%E6%98%AF%E6%82%A8%E8%AE%B0%E5%BD%95%E7%94%9F%E6%B4%BB%E7%9A%84%E6%9C%80%E4%BD%B3%E9%80%89%E6%8B%A9&amp;summary=Mtons%2C%20%E8%BD%BB%E6%9D%BE%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E5%85%B4%E8%B6%A3.%20%E4%BE%BF%E6%8D%B7%E7%9A%84%E6%96%87%E5%AD%97%E3%80%81%E5%9B%BE%E7%89%87%E5%8F%91%E5%B8%83%2C%E6%89%81%E5%B9%B3%E5%8C%96%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E8%AE%BE%E8%AE%A1%2C%E7%BE%8E%E8%A7%82%E3%80%81%E5%A4%A7%E6%B0%94%2C%E6%98%AF%E6%82%A8%E8%AE%B0%E5%BD%95%E7%94%9F%E6%B4%BB%E7%9A%84%E6%9C%80%E4%BD%B3%E9%80%89%E6%8B%A9&amp;site=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%20-%20Mtons"
                  target="_blank"></a><a class="social-share-icon icon-qq"
                                         href="http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2Flocalhost%3A8080%2Fview%2F1&amp;title=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%20-%20Mtons&amp;source=%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%E5%95%8A%20-%20Mtons&amp;desc=Mtons%2C%20%E8%BD%BB%E6%9D%BE%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E5%85%B4%E8%B6%A3.%20%E4%BE%BF%E6%8D%B7%E7%9A%84%E6%96%87%E5%AD%97%E3%80%81%E5%9B%BE%E7%89%87%E5%8F%91%E5%B8%83%2C%E6%89%81%E5%B9%B3%E5%8C%96%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E8%AE%BE%E8%AE%A1%2C%E7%BE%8E%E8%A7%82%E3%80%81%E5%A4%A7%E6%B0%94%2C%E6%98%AF%E6%82%A8%E8%AE%B0%E5%BD%95%E7%94%9F%E6%B4%BB%E7%9A%84%E6%9C%80%E4%BD%B3%E9%80%89%E6%8B%A9&amp;pics=http%3A%2F%2Flocalhost%3A8080%2Fstatic%2Fdefault%2Fimages%2Flogo.png&amp;summary=&quot;Mtons%2C%20%E8%BD%BB%E6%9D%BE%E5%88%86%E4%BA%AB%E4%BD%A0%E7%9A%84%E5%85%B4%E8%B6%A3.%20%E4%BE%BF%E6%8D%B7%E7%9A%84%E6%96%87%E5%AD%97%E3%80%81%E5%9B%BE%E7%89%87%E5%8F%91%E5%B8%83%2C%E6%89%81%E5%B9%B3%E5%8C%96%E7%9A%84%E5%93%8D%E5%BA%94%E5%BC%8F%E8%AE%BE%E8%AE%A1%2C%E7%BE%8E%E8%A7%82%E3%80%81%E5%A4%A7%E6%B0%94%2C%E6%98%AF%E6%82%A8%E8%AE%B0%E5%BD%95%E7%94%9F%E6%B4%BB%E7%9A%84%E6%9C%80%E4%BD%B3%E9%80%89%E6%8B%A9&quot;"
                                         target="_blank"></a></div>
              </div>
              <div class="clearfix"></div>
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
</style>
