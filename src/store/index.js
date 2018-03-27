
import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import home from './modules/home'

// import app from './modules/app';

Vue.use(Vuex);

const debug = process.env.NODE_ENV === 'dev';

const logger = createLogger({
  // 自动展开记录 mutation
  collapsed: false,
  // mutationTransformer (mutation) {
  //   // mutation 格式 { type, payload }
  //   // 我们可以按照想要的方式进行格式化
  //   return mutation.type;
  // },
  transformer (state) {
    // 在记录之前前进行转换
    // 例如，只返回指定的子树
    return state.subTree;
  }
});

export default new Vuex.Store({
  strict: debug,
  plugins: debug ? [logger] : [],
  modules: {
    home
    // app
  }
});
