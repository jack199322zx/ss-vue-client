<template>
  <header>
    <div class="logo f_l"><a href="/"><img v-lazy="images.logo" style="width: 250px;"></a></div>
    <nav id="topnav" class="f_r">
      <ul>
        <a href="javascript:void(0);" @click="goNext(0)" target="_self" :class="{'light-up': lightTitles[0]}">{{headList[0]}}</a>
        <a href="javascript:void(0);" @click="goNext(1)" target="_self" :class="{'light-up': lightTitles[1]}">{{headList[1]}}</a>
        <a href="javascript:void(0);" @click="goNext(2)" target="_self" :class="{'light-up': lightTitles[2]}">{{headList[2]}}</a>
        <a href="javascript:void(0);" @click="goNext(3)" target="_self" :class="{'light-up': lightTitles[3]}">{{headList[3]}}</a>
        <a href="javascript:void(0);" @click="goNext(4)" target="_self" :class="{'light-up': lightTitles[4]}">{{headList[4]}}</a>
        <a href="javascript:void(0);" @click="goNext(5)" target="_self" :class="{'light-up': lightTitles[5]}">{{headList[5]}}</a>
      </ul>
    </nav>
  </header>
</template>

<script>
  import blog from '../../common/img/imgPath';
export default {
  props: {
    headList: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      lightTitles:[],
      images: blog
    }
  },
  methods: {
    goNext(type) {
      this.lightTitles.fill(false);
      this.$set(this.lightTitles, type, true);
      switch (type) {
        case 0: this.$router.go(0);
          return;
        case 1: this.chooseRoute('AboutMe');
          return;
        case 2: this.chooseRoute('BlogList');
          return;
        case 3: this.chooseRoute('Helper');
          return;
        case 4: this.chooseRoute('PhotoAlbum');
          return;
        default:this.chooseRoute('MessageBoard');
      }
    },
    chooseRoute(componentName) {
      this.$store.commit('CHANGE_COMPONENT_STATE', {
        componentName: componentName
      });
    }
  },
  created () {
    this.lightTitles = new Array(this.headList.length);
  }
}
</script>

<style scoped lang="less" rel="stylesheet/less">
  .light-up {
    background-color: #5f5f5f;
  }
</style>

