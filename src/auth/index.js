/**
 * Created by ss on 18/3/24.
 */
import router from '../router';
import http from '../http';
import { POST } from '../utils/value-consts';

const LOGIN_URL = '/broker/auth';
const LOGIN_OUT_URL = '/broker/logout';

const TOKEN_KEY = 'staff_token';
const STAFF_KEY = 'staff_info';
const MENUS_KEY = 'staff_menus';
const TOKEN_KEY_EXPIRE_TIME = 100 * 60 * 60 * 5;


// const load = () => {
//   staff.token = getData(TOKEN_KEY);
//   staff.info = JSON.parse(getData(STAFF_KEY));
//   staff.menus = JSON.parse(getData(MENUS_KEY));
// };

const save = (data) => {
  setData(TOKEN_KEY, data.token, TOKEN_KEY_EXPIRE_TIME);
  setData(STAFF_KEY, JSON.stringify(data.staff), TOKEN_KEY_EXPIRE_TIME);
  setData(MENUS_KEY, JSON.stringify(data.menus), TOKEN_KEY_EXPIRE_TIME);
  // load();
};

const clear = () => {
  staff.token = '';
  staff.info = '';
  staff.menus = '';
  clearData(TOKEN_KEY);
  clearData(STAFF_KEY);
  clearData(MENUS_KEY);
};

const login = (context, creds, redirect) => {
  http.api({
    url: LOGIN_URL,
    method: POST,
    params: creds,
    successCallback: (data) => {
      staff.authenticated = true;
      save(data);
      if (redirect) {
        router.replace(redirect);
        return;
      }
    },
    errorCallback: (error) => {
      context.loginError = error;
      context.captchaCode = '';
    }
  })
  ;
};

const logout = () => {
  http.api({
    url: LOGIN_OUT_URL,
    method: POST,
    successCallback: (data) => {
      staff.authenticated = false;
      clear();
      // router.replace(PATH_LOGIN);
      return;
    },
    errorCallback: (error) => {
      context.loginError = error;
    }
  });
};

const forgetPwdLogout = () => {
  if (staff.info.staffCode != null) {
    logout();
    return;
  }
  staff.authenticated = false;
  clear();
  // router.replace(PATH_LOGIN);
  return;
};

const checkAuth = () => {
  let token = getData(TOKEN_KEY);
  staff.authenticated = !!token;
  staff.authenticated && setData(TOKEN_KEY, token, TOKEN_KEY_EXPIRE_TIME)
  // staff.authenticated && load();
};

/**
 * The object to be passed as a header for authenticated requests
 * @returns {{Authorization}}
 */
const getAuthHeader = () => {
  return {
    'Authorization': getData(TOKEN_KEY)
  };
};

const setData = (name, value, expireTime) => {
  window.localStorage ? window.localStorage.setItem(name, value) : setCookie(name, value, expireTime);
};

const getData = (name) => {
  return window.localStorage ? window.localStorage.getItem(name) : getCookieValue(name);
};

const clearData = (name) => {
  window.localStorage ? window.localStorage.removeItem(name) : setCookie(name, null, -1);
};

const getCookieValue = (name) => {
  var cookieValues = new RegExp('(^| )' + name + '=([^;]*)(;|$)').exec(document.cookie);
  return cookieValues ? cookieValues[2] : null;
};

const setCookie = (name, value, expireTime) => {
  var expiresDate;
  expireTime && (expiresDate = new Date(), expiresDate.setTime(expiresDate.getTime() + expireTime));
  document.cookie = name + '=' + value + (expiresDate ? '; expires=' + expiresDate.toGMTString() : '');
};

const staff = {
  authenticated: false,
  token: '',
  info: {},
  menus: []
};

export default {
  staff,
  login,
  logout,
  forgetPwdLogout,
  checkAuth,
  getAuthHeader,
  getCookieValue,
  save
};
