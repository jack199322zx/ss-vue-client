/**
 * TODO: 暂未考虑 "业务级失败 且 需要重新登录" 的场景
 */
import 'es6-promise/auto';
import URLSearchParams from 'url-search-params';

import store from '../store';
import auth from '../auth';
import { CHANGE_LOAD_SHOW_STATE, OPEN_NO_AUTHORIZATION_DIALOG_BOX } from '../store/mutation-types';
import { HTTP_TIMEOUT, HTTP_ROOT } from '../config';
import { POST, RSPCODE_OK } from '../utils/value-consts';

const baseConfig = (axios) => {
  axios.defaults.baseURL = HTTP_ROOT;
  axios.defaults.timeout = HTTP_TIMEOUT;
};

const transformRequest = (axios) => {
  axios.defaults.transformRequest = [function (data, headers) {
    // 添加 Authorization 头信息
    Object.assign(headers, auth.getAuthHeader());
    // 忽略 'PUT', 'POST', 'PATCH' 请求
    if (data === undefined) {
      return;
    }
    if (data.emulateFile) {
      headers['Content-Type'] = 'multipart/form-data;charset=UTF-8';
      return data.fileData;
    }
    if (!data.emulateJSON) {
      headers['Content-Type'] = 'application/json;charset=UTF-8';
      return JSON.stringify(data);
    }
    // 处理请求体编码
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    let params = new URLSearchParams();
    Object.keys(data).forEach(function (key) {
      params.append(key, data[key]);
    });
    return params;
  }];
};

// intercept requests or responses before they are handled by then or catch
const addRequestInterceptors = (axios) => {
  axios.interceptors.request.use(function (config) {
    if (config.useLoadLayer) {
      store.commit(CHANGE_LOAD_SHOW_STATE, true);
    }
    return config;
  }, function (error) {
    // 发送 request 前发生异常（可能是 自定义的 transformRequest、interceptors，request 信息不完整，甚至 axios 框架本身）
    store.commit(CHANGE_LOAD_SHOW_STATE, false);
    console.error('[request error] ' + error);
    return Promise.reject(error);
  });
};

const addResponseInterceptors = (axios) => {
  axios.interceptors.response.use(function (response) {
    store.commit(CHANGE_LOAD_SHOW_STATE, false);
    return response;
  }, function (error) {
    // 处理 response 时发生异常（包括请求超时，但不包括服务端正常返回的 非2xx 响应）
    store.commit(CHANGE_LOAD_SHOW_STATE, false);
    console.error('[response error] ' + error);
    return Promise.reject(error);
  });
};

const accessInVue = (Vue, axios) => {
  Vue.prototype.$http = axios;
};

const config = (Vue) => {
  baseConfig(axios);
  transformRequest(axios);
  addRequestInterceptors(axios);
  addResponseInterceptors(axios);
  accessInVue(Vue, axios);
};

const api = ({ url, method = POST, params = {}, emulateJSON = true, useLoadLayer = true, timeout = false, successCallback, errorCallback }) => {
  let reqConf = { method, url, useLoadLayer};
  if (method === POST && emulateJSON) {
    params.emulateJSON = true;
  }

  reqConf[method === POST ? 'data' : 'params'] = params;

  if (timeout) {
    axios.defaults.timeout = 100000;
  }

  axios(reqConf).then((response) => {
    let rspCode = response.data.code;
    if (rspCode === RSPCODE_OK) {
      // 业务级成功
      successCallback && successCallback(response.data.data);
    } else {
      // 业务级失败
      if (rspCode === '10') {
        //登录信息失效
        auth.clear()
        store.commit('OPEN_ERROR_TIP', response.data.message)
      } else if(rspCode === '12'){
        //没有权限
        store.commit(OPEN_NO_AUTHORIZATION_DIALOG_BOX, response.data.message);
      } else errorCallback && errorCallback(response);
    }
  }).catch((error) => {
    if (error.response) {
      // 服务端异常（返回的 HTTP 状态码非 2xx）
      errorCallback && errorCallback(error.response);
    } else {
      // 客户端代码异常（request 预处理、 successCallback 执行报错）或 请求超时
      console.error('[Error]', error.message);
    }
    console.error(error.config);
  });
};

const uploadApi = ({ url, method = POST, params = new FormData(), onUploadProgress, useLoadLayer = true, successCallback, errorCallback }) => {
  let reqConf = { method, url, useLoadLayer };
  onUploadProgress && Object.assign(reqConf, {onUploadProgress});
  var param = Object.assign({}, {'fileData': params}, {'emulateFile': true});
  reqConf[method === POST ? 'data' : 'params'] = param;

  axios(reqConf).then((response) => {
    let rspCode = response.data.code;
    if (rspCode === RSPCODE_OK) {
      // 业务级成功
      successCallback && successCallback(response.data.data);
    } else {
      // 业务级失败
      // if (rspCode === '12' || rspCode === '10' || rspCode === '11') {
      //   store.commit(OPEN_NO_AUTHORIZATION_DIALOG_BOX, response.data.message);
      errorCallback && errorCallback(response);
    }
  }).catch((error) => {
    if (error.response) {
      // 服务端异常（返回的 HTTP 状态码非 2xx）
      errorCallback && errorCallback(error.response);
    } else {
      // 客户端代码异常（request 预处理、 successCallback 执行报错）或 请求超时
      console.error('[Error]', error.message);
    }
    console.error(error.config);
  });
};

export default {
  config,
  api,
  uploadApi
};
