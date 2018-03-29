<template>
  <div id="app">
    <router-view/>
    <LoadPlayer></LoadPlayer>
    <OperateBox></OperateBox>
    <tip-box></tip-box>
  </div>
</template>

<script>
  import LoadPlayer from './components/loadPlayer/loadLayer'
  import OperateBox from './components/operateBox/OperateBox.vue'
  import TipBox from '/components/tipBox/PromptDialogBox'

export default {
  name: 'App',
  components: {
    LoadPlayer,
    OperateBox,
    TipBox
  }
}
</script>

<style>
  @import "assets/icon/iconfont.css";
  @import "assets/styles/base.css";
  @import "assets/styles/index.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
