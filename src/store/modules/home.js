/**
 * Created by ss on 18/3/3.
 */
import * as types from '../mutation-types';
import router from '../../router';

const state = {
  isFullMenu: true,
  isLoadLayer: false,
  errorTip: {flag: false, content: ''},
  tipInfo: {
    title: '温馨提示',
    type: true,
    text: '',
    isShow: false,
    confirmHint: '关闭',
    showIcon: true,
    data: {},
    closeCallback: function () {
    }
  },
  operateInfo: {
    title: '操作提示',
    text: '',
    leftOperate: '',
    rightOperate: '',
    data: {},
    sureCallback: function () {
    },
    cancelCallback: function () {
    },
    isShow: false
  },
  miniOperateInfo: {
    title: '操作提示',
    text: '',
    closeButtonText: '不保存',
    confirmButtonText: '保存',
    data: {},
    confirmCallback: function () {
    },
    cancelCallback: function () {
    },
    closeCallback: function () {
    },
    isShow: false
  },
  autoCloseInfo: {
    text: '',
    show: false
  },
  autoCloseWarningInfo: {
    text: '',
    show: false
  },
  saveSuccessInfo: {
    show: false,
    text: ''
  },
  articleCache: {
    articleListDist: [],
    currentPage: '',
    pageCount: '',
    cacheIndex: ''
  },
  articleCacheList: [],
  flagCacheList: [],
  userInfo: {
    userCode: '',
    userId: ''
  }
};

const getters = {
  isFullMenu: state => state.isFullMenu,
  isLoadLayer: state => state.isLoadLayer,
  tipInfo: state => state.tipInfo,
  operateInfo: state => state.operateInfo,
  miniOperateInfo: state => state.miniOperateInfo,
  saveSuccessInfo: state => state.saveSuccessInfo,
  componentInfo: state => state.componentInfo,
};

const mutations = {
  [types.CHANGE_LOAD_SHOW_STATE] (state, isLoadLayer) {
    state.isLoadLayer = isLoadLayer;
  },
  [types.OPEN_NO_AUTHORIZATION_DIALOG_BOX] (state, text) {
    state.tipInfo.isShow = true;
    state.tipInfo.title = '错误提示';
    state.tipInfo.text = text;
    state.tipInfo.closeCallback = function () {
      router.push('/login');
    };
    state.tipInfo.type = false;
    state.tipInfo.confirmHint = '关闭';
    state.tipInfo.showIcon = true;
  },
  [types.CLOSE_PROMPTD_DIALOG_BOX] (state) {
    state.tipInfo.isShow = false;
    state.tipInfo.title = '温馨提示';
    state.tipInfo.text = '';
    state.tipInfo.type = true;
    state.tipInfo.closeCallback && state.tipInfo.closeCallback(state.tipInfo.data);
    state.tipInfo.confirmHint = '关闭';
    state.tipInfo.showIcon = true;
  },
  [types.CLOSE_OPERATE_DIALOG_BOX] (state) {
    state.operateInfo.isShow = false;
    state.operateInfo.text = '';
    state.operateInfo.cancelCallback && state.operateInfo.cancelCallback(state.operateInfo.data);
  },
  [types.SURE_OPERATE_DIALOG_BOX] (state) {
    state.operateInfo.isShow = false;
    state.operateInfo.text = '';
    state.operateInfo.sureCallback && state.operateInfo.sureCallback(state.operateInfo.data);
  },
  [types.OPEN_OPERATE_DIALOG_BOX] (state, operateInfo) {
    state.operateInfo.isShow = true;
    state.operateInfo.text = operateInfo.text;
    state.operateInfo.leftOperate = operateInfo.leftOperate || '取消';
    state.operateInfo.rightOperate = operateInfo.rightOperate || '确定';
    if (operateInfo.data) {
      state.operateInfo.data = operateInfo.data;
    }
    if (operateInfo.sureCallback) {
      state.operateInfo.sureCallback = operateInfo.sureCallback;
    } else {
      state.operateInfo.sureCallback = function () {
      };
    }
    if (operateInfo.cancelCallback) {
      state.operateInfo.cancelCallback = operateInfo.cancelCallback;
    } else {
      state.operateInfo.cancelCallback = function () {
      };
    }
  },
  [types.SAVE_BLOG_LIST] (state, blogList) {
    state.blogListCache = blogList;
  },
  [types.SAVE_FLAG_LIST] (state, flagList) {
    state.flagCacheList = flagList;
  },
  [types.OPEN_ERROR_TIP]: (state, value) => {
    state.errorTip.flag = true;
    state.errorTip.content = value;
  },
  [types.CLOSE_ERROR_TIP]: (state) => {
    state.errorTip.flag = false;
    state.errorTip.content = '';
  },
  [types.SAVE_CACHE_ARTICLE_DIST] (state, articleCache) {
    state.articleCache = articleCache;
    let index = articleCache.cacheIndex;
    state.articleCacheList[index] = articleCache;
  },
  [types.UPDATE_CACHE_ARTICLE_DIST] (state, articleCache) {
    state.articleCache = articleCache;
    let index = articleCache.cacheIndex;
    state.articleCacheList.splice(index, 1, articleCache);
  },
  [types.SAVE_USER_INFO] (state, userInfo) {
    state.userInfo.userCode = userInfo.userCode;
    state.userInfo.userId = userInfo.userId
  }

};

const actions = {}

export default {
  state,
  getters,
  mutations
};
